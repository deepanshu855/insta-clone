// This model is the edge collection.
// It will staore relationship b/w follower and followee (Many to many relationship)

const mongoose = require("mongoose");

const followSchema = mongoose.Schema(
  {
    follower: {
      type: String,
      required: [true, "Follower is required"],
    },
    followee: {
      type: String,
      required: [true, "Followee is required"],
    },
  },
  {
    timestamp: true,
  },
);

// Indexing to ensure single follower and followee relatioships exist.
followSchema.index({ follower: 1, followee: 1 }, { unique: true });

const followModel = mongoose.model("follows", followSchema);
module.exports = followModel;
