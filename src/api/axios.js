import axios from "axios";

const BASE_URL = "http://192.168.51.4/api";

const api = axios.create({ baseURL: BASE_URL });

/* 인터셉터 -> 작업해두면 요청 시 accessToken이 있다면 자동으로 첨부 */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

/*
  응답 인터셉터
  함수 두개를 받는데 모든 응답이 여기 지나가면서 결과따라 갈림
  첫 번째 함수 : 응답이 성공(2XX)일 때 실행 -> 온거 패스 시키기 끝
  두 번째 함수 : 응답이 실패(2XX 아님 / 네트워크 에러)일 때 실행 -> refresh로직을 끼워넣어야함
*/
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    // err.config => "방금 실패한 요청에 대한 설정 정보 전체"
    // -> url, method, headers, params, data(body)
    // 이정보를 가지고 있어야 우리가 실패한 요청 URL로 다시 요청을 보낼 수 있음

    const { config: original, response } = err;
    //console.log(original);
    //console.log(response);

    // 401이 아니면 걍 에러 반환
    if (response.status !== 401) {
      return Promise.reject(err);
    }

    // 만료가아닌 401이오면 빠이빠이
    const isExpired = String(response.data.code).includes("1006");

    if (!isExpired || original._retry) {
      return Promise.reject(err);
    }
    original._retry = true;
    // _retry : 재시도한 요청이 또 401로 오면 이미 refresh한거다 요거를 알아채서
    //          무한루프 막는 용도

    try {
      const refreshToken = localStorage.getItem("refreshToken");

      const { data } = await axios.post(`${BASE_URL}/auth/refresh`, {
        refreshToken,
      });
      // 밑에 적는코드
      //console.log(data);

      localStorage.setItem("token", data.data.accessToken);
      localStorage.setItem("refreshToken", data.data.refreshToken);

      // 막혔던 원래 요청을 시도
      original.headers.Authorization = `Bearer ${data.data.accessToken}`;
      return api(original); // 이설정대로 다시 요청보내줘~~
    } catch (e) {
      // refresh토큰도 만료 / 이상한게 -> 로그아웃
      ["token", "refreshToken", "memberId", "memberName", "role"].forEach((k) =>
        localStorage.removeItem(k),
      );

      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }

      return Promise.reject(e);
    }
  },
);

export default api;
