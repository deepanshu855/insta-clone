import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api/post",
  withCredentials: true,
});

export const getFeed = async () => {
  const response = await instance.get("/feed");
  return response.data;
};
