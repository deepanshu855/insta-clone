const jwt = require("jsonwebtoken");

const identifyUser = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized access, login required",
    });
  }

  // jwt.verify gives error if token is tempered
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      messgae: "Invalid token, Unauthorized access.",
    });
  }

  req.user = decoded;

  next();
};

module.exports = identifyUser;
