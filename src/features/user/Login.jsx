import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [userPwd, setUserPwd] = useState("");
  const { login } = useAuth();
  const navi = useNavigate();

  const onSubmit = () => {
    axios
      .post("http://192.168.51.4/api/auth/login", {
        userId: userId,
        userPwd: userPwd,
      })
      .then((result) => {
        // AuthContext.login이 기대하는 필드(accessToken, refreshToken, userId,
        // userName, role)가 res.data.data 안에 있다고 가정. 다른 조회 API들도
        // res.data.data로 감싸서 응답하는 컨벤션이라 동일하게 맞춤 - 실제 로그인
        // 응답 구조가 다르면 이 부분만 조정하면 됨.
        login(result.data.data);
        navi("/");
      })
      .catch((err) => console.log(err.response));
  };
  return (
    <>
      ID
      <input
        type="text"
        onChange={(e) => {
          //console.log(e.target.value);
          setUserId(e.target.value);
        }}
      />
      PASSWORD
      <input
        type="text"
        onChange={(e) => {
          //console.log(e.target.value);
          setUserPwd(e.target.value);
        }}
      />
      <button onClick={onSubmit}>로그인</button>
    </>
  );
};

export default Login;
