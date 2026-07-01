import { useContext, useEffect } from "react";
import { PostContext } from "../PostProvider";
import { createPost, getFeed } from "../services/post.api";

const usePost = () => {
  const { loading, post, feed, setLoading, setPost, setFeed } =
    useContext(PostContext);

  const handleFeed = async () => {
    setLoading(true);
    try {
      const response = await getFeed();
      setFeed(response.posts.reverse());
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (image, caption) => {
    setLoading(true);
    try {
      const response = await createPost(image, caption);
      setFeed([response.post, ...feed]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // We need to hydrate feed
  useEffect(() => {
    handleFeed();
  }, []);

  return { post, feed, loading, handleFeed, handleCreatePost };
};

export default usePost;
