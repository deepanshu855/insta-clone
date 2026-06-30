import React from "react";
import Login from "../modules/auth/pages/Login";
import Register from "../modules/auth/pages/Register";
import { Route, Routes } from "react-router-dom";
import Feed from "../modules/post/pages/Feed";

const AuthRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default AuthRoutes;
