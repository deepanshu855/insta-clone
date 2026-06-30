import { useContext } from "react";
import { PostContext } from "../PostProvider";
import { getFeed } from "../services/post.api";

const usePost = () => {
  const { loading, post, feed, setLoading, setPost, setFeed } =
    useContext(PostContext);

  const handleFeed = async () => {
    setLoading(true);
    try {
      const response = await getFeed();
      setFeed(response.post);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { post, feed, loading, handleFeed };
};

export default usePost;
