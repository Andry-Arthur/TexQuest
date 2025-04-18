// src/components/GuestOnlyRoute.jsx
import { Navigate } from "react-router-dom";

function GuestOnlyRoute({ children }) {
  const userId = localStorage.getItem("userId");
  return !userId ? children : <Navigate to="/contests" />;
}

export default GuestOnlyRoute;
