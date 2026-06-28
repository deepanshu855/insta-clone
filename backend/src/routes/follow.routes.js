const express = require("express");

const followController = require("../controllers/follow.controller");
const identifyUser = require("../middlewares/identifyUser");

const followRouter = express.Router();

// API POST -> /api/users/follow/:username => To follow user
followRouter.post(
  "/follow/:username",
  identifyUser,
  followController.followUserController,
);

// API POST -> /api/users/unfollow/:username => To unfollow user
followRouter.post(
  "/unfollow/:username",
  identifyUser,
  followController.unfollowUserController,
);

module.exports = followRouter;
