import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { HeaderAdmin } from "../HeaderAdmin/HeaderAdmin";
import { useAuth } from "../../Auth/authContext";

export const WrapperAdmin = () => {
  const navigate = useNavigate();
  const {role} = useAuth();
  
  if(role!== "admin"){
    navigate("/");
  }
  
  return (
    <>
      <HeaderAdmin />
      <Outlet />
    </>
  );
};
