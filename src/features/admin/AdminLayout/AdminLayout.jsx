import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AdminNav from "../AdminNav/AdminNav";
import {
  AdminWrap,
  MainArea,
  TopBar,
  PageTitle,
  LogoutBtn,
} from "./AdminLayout.styles";
import { useAuth } from "../../../context/AuthContext";

const pageTitles = {
  "/admin": "대시보드",
  "/admin/users": "회원 관리",
  "/admin/stations": "충전소 관리",
  "/admin/chargers": "충전기 관리",
  "/admin/requires": "문의사항 관리",
  "/admin/notices": "공지사항 관리",
  "/admin/boards": "게시판 관리",
};

const AdminLayout = () => {
  const { pathname } = useLocation();
  const navi = useNavigate();
  const title = pageTitles[pathname] ?? "관리자";
  const { logout } = useAuth();

  const adminLogout = () => {
    logout();
    navi("/");
  };

  return (
    <AdminWrap>
      <AdminNav />
      <MainArea>
        <TopBar>
          <PageTitle>{title}</PageTitle>
          <LogoutBtn type="button" onClick={adminLogout}>
            로그아웃
          </LogoutBtn>
        </TopBar>
        <Outlet />
      </MainArea>
    </AdminWrap>
  );
};

export default AdminLayout;
