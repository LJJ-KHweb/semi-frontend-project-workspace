import { Route, Routes } from "react-router-dom";
import { ErrMsg, Spacer, ErrSpace } from "./App.styles";
import DefaultLayout from "./components/layout/DefaultLayout";
import AdminLayout from "./features/admin/AdminLayout/AdminLayout";
import Main from "./components/pages/Main/Main";
import Notice from "./features/boards/Notice/Notice";
import Guide from "./components/pages/Guide/Guide";
import Map from "./features/station/Station/Station";
import Admin from "./features/admin/adminPage/Admin";
import StationDetail from "./features/station/Station/StationDetail";
import AdminStations from "./features/admin/AdminStations/AdminStations";
import Login from "./features/user/Login";
import SignUp from "./features/user/SignUp";
import MyPage from "./features/user/MyPage";
import StationForm from "./features/admin/AdminStations/StationForm";
import Board from "./features/boards/board/Board";
import BoardDetail from "./features/boards/board/BoardDetail";
import BoardForm from "./features/boards/board/BoardForm";
import NoticeForm from "./features/boards/Notice/NoticeForm";
import NoticeDetail from "./features/boards/Notice/NoticeDetail";
import Require from "./features/boards/require/Require";
import RequireForm from "./features/boards/require/RequireFrom";
import RequireDetail from "./features/boards/require/RequireDetail";
import AdminRequire from "./features/admin/require/AdminRequire";
import AdminRequireDetail from "./features/admin/require/AdminRequireDetail";
import AdminBoard from "./features/admin/board/AdminBoard";

const App = () => {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Main />} />
        <Route path="/chargeStations" element={<Map />} />
        <Route path="/chargeStations/:stationNo" element={<StationDetail />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/notices" element={<Notice />} />
        <Route path="/notices/form" element={<NoticeForm />} />
        <Route path="/notices/:noticeNo/edit" element={<NoticeForm />} />
        <Route path="/notices/detail/:noticeNo" element={<NoticeDetail />} />
        <Route path="/boards" element={<Board />} />
        <Route path="/boards/form" element={<BoardForm />} />
        <Route path="/boards/:boardNo/edit" element={<BoardForm />} />
        <Route path="/boards/detail/:boardNo" element={<BoardDetail />} />
        <Route path="/ranks" element={<Spacer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/requires" element={<Require />} />
        <Route path="/requires/write" element={<RequireForm />} />
        <Route path="/requires/:requireNo" element={<RequireDetail />} />
        <Route path="/*" element={<ErrPage />} />
      </Route>

      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/users" element={<Spacer />} />
        <Route path="/admin/stations" element={<AdminStations />} />
        <Route path="/admin/stations/form" element={<StationForm />} />
        <Route path="/admin/chargers" element={<Spacer />} />
        <Route path="/admin/requires" element={<AdminRequire />} />
        <Route
          path="/admin/requires/:requireNo"
          element={<AdminRequireDetail />}
        />
        <Route path="/admin/notices" element={<Spacer />} />
        <Route path="/admin/boards" element={<AdminBoard />} />
      </Route>
    </Routes>
  );
};

const ErrPage = () => {
  return (
    <ErrSpace>
      <ErrMsg>없는 페이지 입니다.</ErrMsg>
    </ErrSpace>
  );
};

export default App;
