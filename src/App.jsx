import { Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header/Header";
import { ErrMsg, Spacer, ErrSpace } from "./App.styles";
import Footer from "./components/layout/Footer/Footer";
import Main from "./components/pages/Main/Main";
import Login from "./features/user/Login";
import SignUp from "./features/user/SignUp";
import Board from "./board/Board";

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route path="/chargeStations" element={<Spacer />} />
        <Route path="/guide" element={<Spacer />} />
        <Route path="/notices" element={<Spacer />} />
        <Route path="/boards" element={<Board />} />
        <Route path="/ranks" element={<Spacer />} />
        <Route
          path="/*"
          element={
            <ErrSpace>
              <ErrMsg>없는 페이지 입니다.</ErrMsg>
            </ErrSpace>
          }
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
