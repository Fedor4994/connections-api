const { register, login } = require("../services/authService");

const registerController = async (req, res, next) => {
  try {
    const newUser = await register(req.body);
    newUser
      ? res.status(201).json({
          user: {
            email: newUser.newUser.email,
            subscription: newUser.newUser.subscription,
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
            email: user.user.email,
            subscription: user.user.subscription,
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

module.exports = {
  registerController,
  loginController,
};
