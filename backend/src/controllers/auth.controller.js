const userModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

// API POST=> /api/auth/register : this is used to register user
const registerController = async (req, res) => {
  const { username, email, password, bio, profileImage } = req.body;
  console.log(req.body);

  // Now we need to check whether user exists with email or username.
  const isUser = await userModel.findOne({
    $or: [{ username }, { email }],
  }); // or will check in one query that either username or email present or not.
  console.log(isUser);

  if (isUser) {
    return res.status(409).json({
      message:
        "User already exists" +
        (isUser.email === email
          ? " email already exists"
          : " username already exists"),
    });
  }

  const hash = crypto.createHash("sha256").update(password).digest("hex");
  const user = await userModel.create({
    username,
    email,
    password: hash,
    bio,
    profileImage,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token);

  res.status(201).json({
    message: "User created successfully.",
    user: {
      username,
      email,
      bio,
      profileImage: user.profileImage,
    },
  });
};

// API POST=> /api/auth/login : this is used to login user
const loginController = async (req, res) => {
  // Now user can login with either {username} or {email};
  const { username, email, password } = req.body;

  const isUserexists = await userModel.findOne({
    $or: [
      {
        // It return username if email is undefined i.e userLogged in using username
        username,
      },
      {
        email,
      },
    ],
  });

  if (!isUserexists) {
    return res.status(409).json({
      message: "User doesn't exist",
    });
  }

  // if user exists check pass.
  const isValidPass =
    isUserexists.password ===
    crypto.createHash("sha256").update(password).digest("hex");

  if (!isValidPass) {
    return res.status(404).json({
      message: "Invalid password",
    });
  }

  const token = jwt.sign({ id: isUserexists._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token);

  res.status(200).json({
    message: "Logged in successfully.",
    user: {
      username: isUserexists.username,
      email,
      bio: isUserexists.bio,
      profileImage: isUserexists.profileImage,
    },
  });
};

module.exports = {
  registerController,
  loginController,
};
