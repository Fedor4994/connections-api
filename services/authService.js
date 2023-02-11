const { User } = require("../db/userModel");
// const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");

const register = async ({ name, email, password }) => {
  const user = await User.findOne({ email });
  if (user) {
    return false;
  }

  const avatarURL = gravatar.url(email, { protocol: "http", s: "250" });
  const newUser = new User({ name, email, password, avatarURL });
  await newUser.save();

  const token = jwt.sign(
    {
      _id: newUser._id,
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

  // const isCorrectPassword = await bcrypt.compare(password, user.password);

  const isCorrectPassword = password === user.password; // Must be deleted
  if (!isCorrectPassword) {
    return false;
  }

  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET
  );

  return { user, token };
};

const getCurrentUser = async ({ _id }) => {
  const user = await User.findOne({ _id });

  if (!user) {
    return false;
  }

  return user;
};

module.exports = {
  login,
  register,
  getCurrentUser,
};
