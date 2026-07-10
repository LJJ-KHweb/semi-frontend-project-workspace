import { Outlet, matchPath, useLocation, useNavigate } from "react-router-dom";
import AdminNav from "../AdminNav/AdminNav";
import {
  AdminWrap,
  MainArea,
  TopBar,
  PageTitle,
  LogoutBtn,
} from "./AdminLayout.styles";
import { useAuth } from "../../../context/AuthContext";

// 위에서부터 순서대로 검사하므로, 더 구체적인 경로(/admin/stations/form)를
// 동적 경로(/admin/stations/:stationNo)보다 먼저 둬야 한다.
const pageTitles = [
  { path: "/admin", title: "대시보드" },
  { path: "/admin/users", title: "회원 관리" },
  { path: "/admin/stations", title: "충전소 관리" },
  { path: "/admin/stations/form", title: "충전소 작성" },
  { path: "/admin/stations/:stationNo", title: "충전소 상세보기" },
  { path: "/admin/requires", title: "문의사항 관리" },
  { path: "/admin/requires/:requireNo", title: "문의사항 상세보기" },
  { path: "/admin/notices", title: "공지사항 관리" },
  { path: "/admin/boards", title: "게시판 관리" },
];

const AdminLayout = () => {
  const { pathname } = useLocation();
  const navi = useNavigate();
  const title =
    pageTitles.find(({ path }) => matchPath(path, pathname))?.title ?? "관리자";
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
