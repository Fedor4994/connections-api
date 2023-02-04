const { User } = require("../db/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (user) {
    return false;
  }

  const newUser = new User({ email, password });
  await newUser.save();

  const token = jwt.sign(
    {
      _id: newUser._id,
      email: newUser.email,
    },
    process.env.JWT_SECRET
  );
  return { newUser, token };
};

const login = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    return false;
  }

  const isCorrectPassword = await bcrypt.compare(password, user.password);
  if (!isCorrectPassword) {
    return false;
  }

  const token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET
  );

  return { user, token };
};

module.exports = {
  login,
  register,
};
