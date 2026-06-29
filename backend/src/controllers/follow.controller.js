const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");
const mongoose = require("mongoose");

// API POST -> /api/users/follow/:username => To follow user
const followUserController = async (req, res) => {
  const followerUsername = req.user.username; // This is the username of the user who will follow another user
  const followeeUsername = req.params.username;

  const user = await userModel.findOne({ username: followeeUsername });

  // User must exist
  if (!user) {
    return res.status(404).json({
      message: "username doesn't exist",
    });
  }

  // User cannot follow itself
  if (followeeUsername === followerUsername) {
    return res.status(400).json({
      message: "You cannot follow yourself",
    });
  }

  // find is it already following user or not
  const isFollowed = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  // if follow exists
  if (isFollowed) {
    // following already
    if (isFollowed.status === "active") {
      return res.status(200).json({
        message: "You are already following",
      });
    }

    // Check if follow request is sent or not
    if (isFollowed.status === "pending") {
      return res.status(200).json({
        message: "follow request already sent",
      });
    }

    // if the status is rejected
    if (isFollowed.status === "rejected") {
      isFollowed.status = "pending";
      await isFollowed.save();

      return res.status(200).json({
        message: "follow request sent",
      });
    }
  }

  // if not followed crate
  const follow = await followModel.create({
    follower: followerUsername,
    followee: followeeUsername,
    status: "pending",
  });

  res.status(200).json({
    message: `following request sent to ${followeeUsername}`,
    follow,
  });
};

// API POST -> /api/users/unfollow/:username => To unfollow user
const unfollowUserController = async (req, res) => {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username; // user to unfollow.

  const user = await userModel.findOne({ username: followeeUsername });

  // User must exist
  if (!user) {
    return res.status(404).json({
      message: "username doesn't exist",
    });
  }

  const isFollowed = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (!isFollowed) {
    return res.status(200).json({
      message: `You are not following ${followeeUsername}`,
    });
  }

  const unfollow = await followModel.findByIdAndDelete(isFollowed._id);

  res.status(200).json({
    message: `unfollowed ${followeeUsername}`,
    unfollow,
  });
};

// API GET -> /api/users/follow => This returns all the follow requests
const getFollowRequestController = async (req, res) => {
  const username = req.user.username;

  const requests = await followModel
    .find({
      followee: username,
      status: "pending",
    })
    .sort({ createdAt: -1 }); // To show latest request on top

  if (requests.length === 0) {
    return res.status(200).json({
      message: "You have no pending requests",
      requests,
    });
  }

  return res.status(200).json({
    message: "fetched pending requests successfully",
    requests,
  });
};

const acceptFollowRequestController = async (req, res) => {
  const { id } = req.params;
  const username = req.user.username;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid post ID",
    });
  }

  const user = await userModel.findById(id);

  if (!user) {
    return res.status(404).json({
      message: "user doesn't exists",
    });
  }

  const follow = await followModel.findOne({
    followee: username,
    status: "pending",
  });

  if (!follow) {
    return res.status(200).json({
      message: "request already accepted",
    });
  }

  follow.status = "accepted";
  await follow.save();

  return res.status(200).json({
    message: "follow request accepted",
    follow,
  });
};

const rejectFollowRequestController = async (req, res) => {
  const { id } = req.params;
  const username = req.user.username;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid post ID",
    });
  }

  const user = await userModel.findById(id);

  if (!user) {
    return res.status(404).json({
      message: "user doesn't exists",
    });
  }

  const follow = await followModel.findOne({
    followee: username,
    status: "pending",
  });

  if (!follow) {
    return res.status(200).json({
      message: "request already rejected",
    });
  }

  follow.status = "rejected";
  await follow.save();

  return res.status(200).json({
    message: "follow request rejected",
    follow,
  });
};

module.exports = {
  followUserController,
  unfollowUserController,
  getFollowRequestController,
  acceptFollowRequestController,
  rejectFollowRequestController,
};
