import React from "react";
import { data, Link, useNavigate } from "react-router-dom";
import "../styles/form.scss";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const { register, handleSubmit } = useForm();
  const { handleRegister, loading } = useAuth();
  const navigate = useNavigate();

  const submitHandler = async (data) => {
    const { email, username, password } = data;
    await handleRegister(email, username, password);
    navigate("/");
  };

  return (
    <main>
      <h2>Register</h2>
      <form className="form-container" onSubmit={handleSubmit(submitHandler)}>
        <input {...register("email")} type="email" placeholder="Enter email" />
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

        <button>Register</button>
      </form>
      <p>Already have an account? </p>
      <Link to="/login">login</Link>
    </main>
  );
};

export default Register;
