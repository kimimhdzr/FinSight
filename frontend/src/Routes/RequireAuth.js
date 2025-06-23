import { Navigate } from "react-router-dom";
import { useAuthContext } from "./AuthContext"; // path as needed

const RequireAuth = ({ children }) => {
  const { user } = useAuthContext();
  return user ? children : <Navigate to="/login" replace />;
};

export default RequireAuth;
