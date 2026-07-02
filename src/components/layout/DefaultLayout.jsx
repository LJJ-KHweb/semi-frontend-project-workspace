import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

// <Outlet /> 자식 컴포넌트가 들어갈 공간
// <Header />
//  <Outlet /> ← 여기에 Route 태그의 element 안에 있는 컴포넌트가 들어감
// <Footer />
const DefaultLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default DefaultLayout;
