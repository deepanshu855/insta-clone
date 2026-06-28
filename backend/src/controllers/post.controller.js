const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const postModel = require("../models/post.model");
const likeModel = require("../models/like.model");
const userModel = require("../models/user.model");

// Now the user should be able to upload image in the form of file. => this can be done with the help of multer as multer can read the form-data.
// To store the uploaded image we'll use the memory storage as we'll be storing the image in imagekit.io

const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, // This is the default and can be omitted
});

// API POST => /api/post/ : to create post
const createPostController = async (req, res) => {
  const { caption } = req.body;

  if (!req.file) {
    return res.status(400).json({
      messgae: "Post image is required",
    });
  }

  // We can get the image url
  const file = await client.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: req.file.originalname,
    folder: "/cohort-2-instaClone/posts",
  });

  const post = await postModel.create({
    caption,
    user: req.user.id,
    postImage: file.url,
  });

  res.status(201).json({
    message: "Post created successfully",
    post,
  });
};

// API GET => /api/post/ : user can see all their posts
const getPostController = async (req, res) => {
  const userId = req.user.id;

  // This will return all the posts created by a user with this userId
  const post = await postModel.find({
    user: userId,
  });

  return res.status(200).json({
    message: "Posts fetched successfully.",
    post,
  });
};

// API GET => /api/post/details/:id => it returns details about the specific post with the id
const getDetailsPostController = async (req, res) => {
  const userId = req.user.id;
  const { postId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({
      message: "Invalid post ID",
    });
  }

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  const isValidUser = post.user.toString() === userId; // we need to convert to string as they are ObjectId

  if (!isValidUser) {
    return res.status(403).json({
      message: "Forbidden content",
    });
  }

  res.status(200).json({
    message: "Post details",
    post,
  });
};

// API POST => /api/post/like/:postId => likes a post with given id
const likePostController = async (req, res) => {
  const postId = req.params.postId;
  const username = req.user.username;

  const user = await userModel.findOne({ username });

  // User must exist
  if (!user) {
    return res.status(404).json({
      message: "username doesn't exist",
    });
  }

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({
      message: "Invalid post ID",
    });
  }

  const post = await postModel.findOne({
    _id: postId,
  });

  if (!post) {
    return res.status(404).json({
      messgae: "Post doesn't exist",
    });
  }

  const isLiked = await likeModel.findOne({
    post: postId,
    user: username,
  });

  if (isLiked) {
    return res.status(200).json({
      message: "Post already liked",
      isLiked,
    });
  }

  const like = await likeModel.create({
    post: postId,
    user: username,
  });

  res.status(200).json({
    message: "Post liked successfully",
    like,
  });
};

module.exports = {
  createPostController,
  getPostController,
  getDetailsPostController,
  likePostController,
};
