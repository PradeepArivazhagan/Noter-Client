import { Navigate, Outlet } from "react-router-dom";
import Cookie from "js-cookie";

const PublicRoute = () => {
  const token = Cookie.get("jwtToken");
  return token ? <Navigate to="/notes" replace /> : <Outlet />;
};

export default PublicRoute;