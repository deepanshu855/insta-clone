import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export const getFeed = async () => {
  const response = await instance.get("/post/feed");
  return response.data;
};

export const createPost = async (image, caption) => {
  const formData = new FormData();

  formData.append("image", image);
  formData.append("caption", caption);

  const response = await instance.post("/post", formData);
  return response.data;
};
