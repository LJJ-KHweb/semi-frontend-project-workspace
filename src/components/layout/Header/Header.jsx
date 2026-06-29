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

const navs = [
  { content: "메인화면", nav: "/" },
  { content: "충전소 조회", nav: "/chargeStations" },
  { content: "이용방법", nav: "/guide" },
  { content: "공지사항", nav: "/notices" },
  { content: "게시판", nav: "/boards" },
  { content: "랭킹", nav: "/ranks" },
];

const Header = () => {
  const navi = useNavigate();

  return (
    <HeaderWrap>
      <Logo onClick={() => navi("/")}>EV:RE</Logo>

      <Nav>
        {navs.map((n) => (
          <NavLink onClick={() => navi(n.nav)}>{n.content}</NavLink>
        ))}
      </Nav>

      <Btns>
        <LoginBtn type="button">로그인</LoginBtn>
        <SignupBtn type="button">회원가입</SignupBtn>
      </Btns>
    </HeaderWrap>
  );
};

export default Header;
