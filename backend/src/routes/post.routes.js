const express = require("express");
const postController = require("../controllers/post.controller");
const identifyUser = require("../middlewares/identifyUser");

const postRouter = express.Router();

// All the post routes are protected route

// POST Api => /api/post/ -> used to create post
postRouter.post("/", identifyUser, postController.createPostController);

// GET Api => /api/post -> user can see their all post.
postRouter.get("/", identifyUser, postController.getPostController);

// GET Api => /api/post/details/:postId -> it returns details about the specific post with the id
postRouter.get(
  "/details/:postId",
  identifyUser,
  postController.getDetailsPostController,
);

// POST API => /api/post/like/:postId => likes a post with given postId
postRouter.post(
  "/like/:postId",
  identifyUser,
  postController.likePostController,
);

// GET API => /api/post/feed => it returns the feed
postRouter.get("/feed", identifyUser, postController.getFeedPostController)

module.exports = postRouter;
