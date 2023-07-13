import React from "react";
import { useAuth } from "./authContext";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import {Outlet} from "react-router"

export const ProtectedRoutes = ({ children }) => {
  const { userAuth } = useAuth();

  if (!userAuth) {
    toast.error("You must log in to continue with the purchase.");
    return <Navigate to="/login" />;
  }
  if(userAuth?.email && userAuth?.emailVerified === false){
    toast.error("You must verify your email to continue with the purchase.");
    return <Navigate to="/games" />;
  }

  return <Outlet/>;
};
