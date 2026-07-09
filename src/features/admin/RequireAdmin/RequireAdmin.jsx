import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

// /admin/** 전체를 감싸서 로그인 안 했거나 관리자가 아니면 접근을 막는다.
const RequireAdmin = () => {
  const { user, isLogin } = useAuth();
  const location = useLocation();

  if (!isLogin) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (user?.role !== "[ROLE_ADMIN]") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default RequireAdmin;
