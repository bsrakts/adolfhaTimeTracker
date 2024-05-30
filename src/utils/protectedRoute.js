import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../auth";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
