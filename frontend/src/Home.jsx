import React from "react";
import { useAuth } from "./modules/auth/hooks/useAuth";

const Home = () => {
  const { user } = useAuth();

  if (user == null || user.length == 0) {
    return (
      <div>
        <h1>You need to login</h1>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome @{user.username}</h1>
    </div>
  );
};

export default Home;
