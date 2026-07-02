import { Route, Routes } from "react-router-dom";
import { ErrMsg, Spacer, ErrSpace } from "./App.styles";
import DefaultLayout from "./components/layout/DefaultLayout";
import AdminLayout from "./features/admin/AdminLayout/AdminLayout";
import Main from "./components/pages/Main/Main";
import Board from "./features/boards/board/Board";
import Map from "./features/station/Station/Station";
import Admin from "./features/admin/Admin/Admin";
import StationDetail from "./features/station/Station/StationDetail";

const App = () => {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Main />} />
        <Route path="/chargeStations" element={<Map />} />
        <Route path="/chargeStations/:stationNo" element={<StationDetail />} />
        <Route path="/guide" element={<Spacer />} />
        <Route path="/notices" element={<Spacer />} />
        <Route path="/boards" element={<Board />} />
        <Route path="/ranks" element={<Spacer />} />
        <Route path="/*" element={<ErrPage />} />
      </Route>

      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/users" element={<Spacer />} />
        <Route path="/admin/stations" element={<Spacer />} />
        <Route path="/admin/chargers" element={<Spacer />} />
        <Route path="/admin/requires" element={<Spacer />} />
        <Route path="/admin/notices" element={<Spacer />} />
        <Route path="/admin/boards" element={<Spacer />} />
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
