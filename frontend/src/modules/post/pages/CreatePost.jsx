import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import "../styles/createPost.scss";
import usePost from "../hooks/usePost";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const { register, handleSubmit } = useForm();
  const { loading, feed, handleCreatePost } = usePost();

  const postImageFieldRef = useRef(null);

  const naigate = useNavigate();

  if (loading) {
    return <h1>Creating post...</h1>;
  }

  const submitHandler = async (data) => {
    const { caption } = data;

    const file = postImageFieldRef.current.files[0]; // Takt the first file only.

    await handleCreatePost(file, caption);

    naigate("/");
  };

  return (
    <main className="create-post-container">
      <div className="create-post">
        <h1>Upload Post</h1>
        <form onSubmit={handleSubmit(submitHandler)}>
          <label htmlFor="postImage">Select File (Image)</label>
          <input ref={postImageFieldRef} hidden type="file" id="postImage" />
          <input
            className="caption-input"
            {...register("caption")}
            placeholder="caption"
          ></input>
          <button>Create Post</button>
        </form>
      </div>
    </main>
  );
};

export default CreatePost;
