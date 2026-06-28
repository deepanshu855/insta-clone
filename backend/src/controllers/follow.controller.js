const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");

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

  // following already
  if (isFollowed) {
    return res.status(200).json({
      message: "You have already followed",
    });
  }

  // if not followed crate
  const follow = await followModel.create({
    follower: followerUsername,
    followee: followeeUsername,
  });

  res.status(200).json({
    message: `You are following ${followeeUsername}`,
    follow,
  });
};

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

module.exports = {
  followUserController,
  unfollowUserController
};
