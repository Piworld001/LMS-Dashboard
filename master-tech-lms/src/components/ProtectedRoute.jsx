import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

// Wraps anything that needs a logged-in user
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;