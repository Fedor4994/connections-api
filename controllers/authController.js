const { register, login, getCurrentUser } = require("../services/authService");

const registerController = async (req, res, next) => {
  try {
    const newUser = await register(req.body);
    newUser
      ? res.status(201).json({
          user: {
            name: newUser.newUser.name,
            email: newUser.newUser.email,
          },
          token: newUser.token,
        })
      : res.status(409).json({ message: "Email in use" });
  } catch (err) {
    next(err);
  }
};

const loginController = async (req, res, next) => {
  try {
    const user = await login(req.body);
    user
      ? res.status(200).json({
          user: {
            name: user.user.name,
            email: user.user.email,
          },
          token: user.token,
        })
      : res.status(401).json({
          message: "Email or password is wrong",
        });
  } catch (err) {
    next(err);
  }
};

const getCurrentUserController = async (req, res, next) => {
  const user = await getCurrentUser(req.user);

  user
    ? res.status(200).json({
        user: {
          name: user.name,
          email: user.email,
        },
      })
    : res.status(401).json({
        message: "Not authorized",
      });
};

module.exports = {
  registerController,
  loginController,
  getCurrentUserController,
};
