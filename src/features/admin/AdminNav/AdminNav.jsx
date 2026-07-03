import { useNavigate, useLocation } from "react-router-dom";
import {
  SideBar,
  LogoArea,
  Logo,
  AdminBadge,
  NavList,
  NavItem,
  NavBtn,
  BackBtn,
} from "./AdminNav.styles";

const adminNavs = [
  { content: "회원 관리", nav: "/admin/users" },
  { content: "충전소 관리", nav: "/admin/stations" },
  { content: "충전기 관리", nav: "/admin/chargers" },
  { content: "문의사항 관리", nav: "/admin/requires" },
  { content: "공지사항 관리", nav: "/admin/notices" },
  { content: "게시판 관리", nav: "/admin/boards" },
];

const AdminNav = () => {
  const navi = useNavigate();
  const { pathname } = useLocation();

  return (
    <SideBar>
      <LogoArea onClick={() => navi("/admin")}>
        <Logo>EV:RE</Logo>
        <AdminBadge>admin</AdminBadge>
      </LogoArea>

      <NavList>
        {adminNavs.map((n) => (
          <NavItem key={n.nav}>
            <NavBtn $active={pathname === n.nav} onClick={() => navi(n.nav)}>
              {n.content}
            </NavBtn>
          </NavItem>
        ))}
      </NavList>

      <BackBtn type="button" onClick={() => navi("/")}>
        ← 일반 화면으로
      </BackBtn>
    </SideBar>
  );
};

export default AdminNav;
