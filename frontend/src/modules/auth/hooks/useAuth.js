import { useContext } from "react";
import { AuthContext } from "../AuthProvider";
import { loginUser, registerUser } from "../services/auth.api";

export const useAuth = () => {
  const { user, loading, setUser, setLoading } = useContext(AuthContext);

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

  return { user, loading, handleLogin, handleRegister };
};
