import { Navigate } from "react-router-dom";
import { routes } from ".";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/features/counterSlice";

const ProtectedRoute = ({ children, role }) => {
  const user = useSelector(selectUser);
  if (!user.role) {
    return <Navigate to={routes.login} />;
  }
  if (user.role !== role) {
    return <Navigate to={routes.notfound} />;
  }
  return children;
};

export default ProtectedRoute;
