// src/components/AuthRoute.jsx
import { Navigate } from "react-router-dom";

function AuthRoute({ children }) {
  const userId = localStorage.getItem("userId");
  return userId ? children : <Navigate to="/login" />;
}

export default AuthRoute;
