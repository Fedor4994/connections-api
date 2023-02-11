const express = require("express");
const { uploadController } = require("../controllers/filesController");
const { uploadMiddleware } = require("../middlewares/filesMiddleware");

const router = express.Router();

router.patch("/avatars", uploadMiddleware.single("avatar"), uploadController);
router.use("/download", express.static("tmp/"));

module.exports = router;
