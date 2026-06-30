import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./modules/shared/global.scss";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./modules/auth/AuthProvider.jsx";
import PostProvider from "./modules/post/PostProvider.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <PostProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PostProvider>
  </AuthProvider>,
);
