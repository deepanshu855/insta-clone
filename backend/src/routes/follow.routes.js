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

// API GET -> /api/users/follow => This returns all the follow requests
followRouter.get(
  "/follow/requests",
  identifyUser,
  followController.getFollowRequestController,
);

// API PATCH -> /api/users/follow/:username/accept => to accept the follow request
followRouter.patch(
  "/follow/:id/accept",
  identifyUser,
  followController.acceptFollowRequestController,
);

// API PATCH -> /api/users/follow/:username/reject => to reject the follow request
followRouter.patch(
  "/unfollow/:id/reject",
  identifyUser,
  followController.rejectFollowRequestController,
);

module.exports = followRouter;
