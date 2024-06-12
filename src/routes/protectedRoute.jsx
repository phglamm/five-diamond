import { Navigate, useLocation } from "react-router-dom";
import { routes } from ".";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/counterSlice";

const ProtectedRoute = ({ children, role, role2, role3 }) => {
  const user = useSelector(selectUser);
  const location = useLocation();
  console.log(location.pathname === "/");
  console.log(role);

  // if (user.role === "ADMIN" && location.pathname === "/") {
  //   return <Navigate to={routes.login} />;
  // }

  if (!user.role) {
    return <Navigate to={routes.login} />;
  }
  if (user.role !== role) {
    return <Navigate to={routes.notfound} />;
  }

  console.log(user.role);
  console.log(role);
  return children;
};

export default ProtectedRoute;
