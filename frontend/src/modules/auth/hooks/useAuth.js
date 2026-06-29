import { useContext } from "react";
import { AuthContext } from "../AuthProvider";

export const useAuth = () => {
  const context = useContext(AuthContext);
  console.log(context);
  return context;
};
