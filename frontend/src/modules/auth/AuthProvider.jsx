// This is State Layer
import { createContext, useState } from "react";
import { loginUser, registerUser } from "./services/auth.api";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // For authentication we'll create 2 state variables.

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (username, password) => {
    // setLoading ensure that when we are fetching data we get loading properly
    setLoading(true);
    try {
      const response = await loginUser(username, password);
      setUser(response.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (email, username, password) => {
    setLoading(true);
    try {
      const response = await registerUser(email, username, password);
      setUser(response.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, handleLogin, handleRegister }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
