import React from "react";
import { Outlet } from "react-router-dom";
import { HeaderAdmin } from "../HeaderAdmin/HeaderAdmin";
export const WrapperAdmin = () => {
  return (
    <>
      <HeaderAdmin />
      <Outlet />
    </>
  );
};
