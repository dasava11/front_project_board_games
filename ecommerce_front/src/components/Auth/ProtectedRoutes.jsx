import React from "react";
import { useAuth } from "./authContext";
import { Navigate } from "react-router-dom";
//proteger rutas admin

export const ProtectedRoutes = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <h1>Loading</h1>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};
