const express = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/authController");
const { authValidation } = require("../middlewares/validationMiddleware");

const router = express.Router();

router.post("/register", authValidation, registerController);
router.post("/login", authValidation, loginController);

module.exports = router;
