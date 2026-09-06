EVRE Frontend

전기차 충전 인프라와 친환경 주행 마일리지를 함께 다루는 웹 서비스 EVRE의 프론트엔드입니다.

사용자는 지도에서 충전소를 찾고, 공유 전기차 이용 내역을 등록하면 주행 데이터를 기반으로 계산된 탄소 절감량과 마일리지를 확인할 수 있습니다. 적립한 마일리지는 상점에서 사용할 수 있으며, 관리자는 별도 화면에서 회원·충전소·상품·게시글을 관리합니다.

백엔드 저장소 — semi-backend-project-workspace
개발 기간 — 2026.06 ~ 2026.07 (3인 팀)
기술 스택
구분	사용 기술
Language	JavaScript (ES2022)
Library	React 19
Build	Vite
Routing	React Router 7
Styling	styled-components
HTTP	axios
Chart	Recharts
Etc	react-datepicker, uuid
Lint	ESLint (react-hooks, react-refresh)
실행 방법
bash
npm install
npm run dev

기본 개발 서버는 Vite가 제공하는 포트에서 실행되며, API 요청은 src/api/axios.js에 설정된 백엔드 주소로 전달됩니다. 백엔드 서버를 먼저 실행해야 데이터 조회가 정상 동작합니다.

bash
npm run build     # 프로덕션 빌드
npm run preview   # 빌드 결과 확인
npm run lint      # ESLint 검사
프로젝트 구조

도메인 단위로 디렉터리를 나누고, 각 도메인 안에서 컴포넌트와 스타일 파일을 분리했습니다.

src
├── api/                  axios 인스턴스 및 인터셉터
├── context/              AuthContext (로그인 상태 전역 관리)
├── components/
│   ├── layout/           Header, Footer, DefaultLayout
│   └── pages/            메인, 이용 가이드
├── features/
│   ├── user/             로그인, 회원가입, 마이페이지
│   ├── station/          충전소 지도(Kakao Map), 충전소 상세
│   ├── ranking/          탄소 절감량 기준 회원 랭킹
│   ├── shop/             마일리지 상점
│   ├── boards/           게시판, 공지사항, 1:1 문의
│   └── admin/            관리자 - 회원 / 충전소 / 상품 / 게시글 / 문의
└── styles/               전역 스타일
주요 화면
경로	화면
/	메인
/chargeStations	충전소 지도
/chargeStations/:stationNo	충전소 상세
/mypage	마이페이지 — 회원정보 수정, 탄소 절감량 차트, 마일리지 내역
/ranks	탄소 절감량 기준 회원 랭킹
/shop	마일리지 상점
/notices, /boards, /requires	공지사항 · 게시판 · 1:1 문의
/admin/*	관리자 (회원 / 충전소 / 상품 / 게시글 / 공지 / 문의)
인증 처리

src/api/axios.js의 axios 인스턴스에 요청·응답 인터셉터를 두어, 화면마다 토큰을 다루지 않도록 했습니다.

요청 인터셉터 — 저장된 Access Token이 있으면 Authorization: Bearer {token} 헤더를 자동으로 첨부합니다.
응답 인터셉터 — 401 응답을 받으면 Refresh Token으로 재발급을 시도한 뒤 실패했던 요청을 다시 보냅니다. 재발급까지 실패하면 로그인 화면으로 보냅니다.
AuthContext — 로그인 상태와 사용자 정보를 전역으로 관리해, 헤더와 관리자 라우트 가드에서 함께 사용합니다.

관리자 화면은 RequireAdmin 컴포넌트로 감싸 권한이 없는 접근을 차단합니다.

담당 파트

3인 팀 프로젝트이며, 아래 화면을 담당했습니다. (전체 커밋 154건 중 54건)

화면	내용
마이페이지	회원정보 수정, 주행 이력 기반 탄소 절감량 차트(Recharts), 마일리지 적립·차감 내역
회원 랭킹	탄소 절감량 기준 순위 및 내 순위 표시
마일리지 상점	상품 목록 및 구매 UI
공지사항	상세·작성 화면, 파일 첨부, 서버 페이지네이션 연동
관리자 상품 관리	상품 등록·수정·삭제
관리자 회원 관리	회원 조회 및 권한 변경

백엔드에서는 팀장으로 API 설계를 총괄했으며, 라즈베리파이 데이터 연동·랭킹·마이페이지·공지사항 API와 파일 업로드 공통 서비스를 담당했습니다. 상세 내용은 백엔드 저장소에 정리했습니다.

개선하고 싶은 점
API 주소가 src/api/axios.js에 상수로 들어가 있습니다. 환경 변수(import.meta.env)로 분리해 개발·운영 환경을 구분하는 것이 맞다고 생각합니다.
화면마다 useState로 로딩·에러 상태를 각각 관리하고 있어, 서버 상태를 다루는 공통 훅으로 정리할 여지가 있습니다.
