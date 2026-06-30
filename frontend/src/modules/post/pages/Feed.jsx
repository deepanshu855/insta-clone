import React, { useEffect } from "react";
import Post from "../components/Post";
import usePost from "../hooks/usePost";

const Feed = () => {
  const { post, feed, loading, handleFeed } = usePost();

  useEffect(() => {
    handleFeed();
  }, []);

  if (loading || !feed) {
    return <h1>Loading...</h1>;
  }

  console.log(feed);

  return (
    <main className="feed-container">
      <div className="feeds">
        <div className="posts">
          {feed.map((post,idx) => {
            return <Post key={idx} user={post.user} post={post}/>
          })}
        </div>
      </div>
    </main>
  );
};

export default Feed;
