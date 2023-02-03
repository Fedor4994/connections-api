const jwt = require("jsonwebtoken");
const { User } = require("../db/userModel");

const authMiddleware = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }
  const [, token] = req.headers.authorization.split(" ");
  if (!token) {
    return res.status(401).json({
      message: "Not authorized",
    });
  }

  try {
    const user = jwt.decode(token, process.env.JWT_SECRET);

    const userInDb = await User.findById(user._id);
    if (!userInDb) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({
      message: "Not authorized",
    });
  }
};

module.exports = {
  authMiddleware,
};
