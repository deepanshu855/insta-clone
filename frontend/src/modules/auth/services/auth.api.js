// This is API Layer
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

export const registerUser = async (email, username, password) => {
  const response = await instance.post("/register", {
    email,
    username,
    password,
  });

  return response.data;
};

export const loginUser = async (username, password) => {
  const response = await instance.post("/login", {
    username,
    password,
  });

  return response.data;
};

export const getMeUser = async (email, username, password) => {
  const response = await instance.get("/get-me");

  return response.data;
};
