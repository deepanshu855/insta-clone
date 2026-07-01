import React from "react";
import "../styles/post.scss";

const Post = ({ user, post }) => {
  return (
    <div className="post">
      <div className="post-header">
        <div className="img-wrapper">
          <img src={user.profileImage} alt="" />
        </div>
        <p>{user.username}</p>
      </div>
      <div className="post-img">
        <img src={post.postImage} alt="" />
      </div>
      <div className="icons">
        <div className="left">
          {post.isLiked ? (
            <i className="ri-poker-hearts-fill"></i>
          ) : (
            <i className="ri-poker-hearts-line"></i>
          )}
          <i className="ri-share-forward-line"></i>
        </div>
        <div className="right">
          <i className="ri-bookmark-line"></i>
        </div>
      </div>
      <p>{post.caption}</p>
    </div>
  );
};

export default Post;
