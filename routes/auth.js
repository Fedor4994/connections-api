const express = require("express");
const {
  registerController,
  loginController,
  getCurrentUserController,
} = require("../controllers/authController");
const {
  registerValidation,
  loginValidation,
} = require("../middlewares/validationMiddleware");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { uploadController } = require("../controllers/filesController");
const { uploadMiddleware } = require("../middlewares/filesMiddleware");

const router = express.Router();

router.post("/register", registerValidation, registerController);
router.post("/login", loginValidation, loginController);
router.get("/current", authMiddleware, getCurrentUserController);

router.patch(
  "/avatars",
  authMiddleware,
  uploadMiddleware.single("avatar"),
  uploadController
);

module.exports = router;
