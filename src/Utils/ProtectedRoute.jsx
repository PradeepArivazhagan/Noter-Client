import Cookie from "js-cookie";
import { Outlet, Navigate } from "react-router-dom";
const ProtectedRoute = () => {
  let auth = Cookie.get("jwtToken");
  return auth ? <Outlet /> : <Navigate to="/login" replace/>;
};

export default ProtectedRoute;
