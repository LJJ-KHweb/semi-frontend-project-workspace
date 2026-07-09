import { useNavigate } from "react-router-dom";
import {
  HeaderWrap,
  Logo,
  Nav,
  NavLink,
  Btns,
  LoginBtn,
  SignupBtn,
} from "./Header.styles";
import { useAuth } from "../../../context/AuthContext";

const navs = [
  { content: "충전소 조회", nav: "/chargeStations" },
  { content: "이용방법", nav: "/guide" },
  { content: "공지사항", nav: "/notices" },
  { content: "자유게시판", nav: "/boards" },
  { content: "랭킹", nav: "/ranks" },
];

const authNavs = [
  { content: "마일리지 상점", nav: "/shop" },
  { content: "문의하기", nav: "/requires" },
];

const Header = () => {
  const navi = useNavigate();
  const { isLogin, user, login, logout } = useAuth();
  const userNavs = isLogin ? [...navs, ...authNavs] : navs;
  const isAdmin = isLogin && user?.role === "[ROLE_ADMIN]";

  const Logout = () => {
    logout();
    navi("/");
  };

  return (
    <HeaderWrap>
      <Logo onClick={() => navi("/")}>EV:RE</Logo>

      <Nav>
        {userNavs.map((n) => (
          <NavLink key={n.nav} onClick={() => navi(n.nav)}>
            {n.content}
          </NavLink>
        ))}
      </Nav>

      <Btns>
        {isLogin ? (
          <>
            <NavLink key="/mypage" onClick={() => navi("/mypage")}>
              {user.userName}님
            </NavLink>
            {isAdmin && (
              <LoginBtn type="button" onClick={() => navi("/admin")}>
                관리자 페이지
              </LoginBtn>
            )}
            <SignupBtn type="button" onClick={Logout}>
              로그아웃
            </SignupBtn>
          </>
        ) : (
          <>
            <LoginBtn type="button" onClick={() => navi("/login")}>
              로그인
            </LoginBtn>
            <SignupBtn type="button" onClick={() => navi("/signup")}>
              회원가입
            </SignupBtn>
          </>
        )}
      </Btns>
    </HeaderWrap>
  );
};

export default Header;
