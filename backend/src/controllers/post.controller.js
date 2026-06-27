const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

const postModel = require("../models/post.model");

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

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized access, login required",
    });
  }

  let decoded = null;

  // jwt.verify gives error if token is tempered
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(409).json({
      message: "Invalid token, Unauthorized access.",
    });
  }

  const post = await postModel.create({
    caption,
    user: decoded.id,
    postImage: file.url,
  });

  res.status(201).json({
    message: "Post created successfully",
    post,
  });
};

module.exports = {
  createPostController,
};
