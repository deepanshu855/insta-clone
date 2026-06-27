const express = require("express");
const postController = require("../controllers/post.controller");

const postRouter = express.Router();

// All the post routes are protected route

// POST Api => /api/post/ -> used to create post
postRouter.post("/", postController.createPostController);

// GET Api => /api/post -> user can see their all post.
postRouter.get("/", postController.getPostController);

// GET Api => /api/post/details/:postId -> it returns details about the specific post with the id
postRouter.get("/details/:postId", postController.getDetailsPostController);

module.exports = postRouter;
