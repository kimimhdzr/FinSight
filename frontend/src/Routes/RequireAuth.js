import { Navigate } from "react-router-dom";
import { useAuth } from "./UseAuth"; // Custom auth hook



const RequireAuth = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

export default RequireAuth;