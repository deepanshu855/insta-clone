import React from "react";
import Login from "../modules/auth/pages/Login";
import Register from "../modules/auth/pages/Register";
import { Route, Routes } from "react-router-dom";

const AuthRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default AuthRoutes;
