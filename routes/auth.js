const express = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/authController");
const {
  registerValidation,
  loginValidation,
} = require("../middlewares/validationMiddleware");

const router = express.Router();

router.post("/register", registerValidation, registerController);
router.post("/login", loginValidation, loginController);

module.exports = router;
