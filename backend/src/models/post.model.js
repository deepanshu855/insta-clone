const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  caption: {
    type: String,
    default: "",
  },
  postImage: {
    type: String,
    required: [true, "Image is required for creating post"],
  },
  // User will store the userId of the user who created the post
  user: {
    ref: "users",
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "UserId is required for creating post"],
  },
});

const postModel = mongoose.model("posts", postSchema);
module.exports = postModel;
