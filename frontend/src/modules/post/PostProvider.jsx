import React, { createContext, useState } from "react";

export const PostContext = createContext();

const PostProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState(null);
  const [feed, setFeed] = useState(null);

  return (
    <PostContext.Provider
      value={{ loading, post, feed, setLoading, setPost, setFeed }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;
