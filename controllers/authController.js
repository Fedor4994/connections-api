const { register, login } = require("../services/authService");

const registerController = async (req, res, next) => {
  try {
    const user = await register(req.body);
    user
      ? res.status(201).json({
          user: {
            email: user.email,
            subscription: user.subscription,
          },
        })
      : res.status(409).json({ message: "Email in use" });
  } catch (err) {
    next(err);
  }
};

const loginController = async (req, res, next) => {
  try {
    const token = await login(req.body);
    token
      ? res.status(200).json({ status: "success", token })
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
