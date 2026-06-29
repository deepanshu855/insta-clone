import React from "react";
import { Link } from "react-router-dom";
import "../styles/form.scss";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { register, handleSubmit } = useForm();

  const { handleLogin, loading } = useAuth();

  const submitHandler = (data) => {
    const { username, password } = data;

    handleLogin(username, password).then((res) => {
      console.log(res);
    });
  };

  return (
    <main>
      <h2>Login</h2>
      <form className="form-container" onSubmit={handleSubmit(submitHandler)}>
        <input
          {...register("username")}
          type="text"
          placeholder="Enter username"
        />
        <input
          {...register("password")}
          type="password"
          placeholder="Enter password"
        />

        <button>Login</button>
      </form>
      <p>Dont have an account? </p>
      <Link to="/register">Register</Link>
    </main>
  );
};

export default Login;
