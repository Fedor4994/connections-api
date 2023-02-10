const express = require("express");
const multer = require("multer");
const { uploadController } = require("../controllers/filesController");

const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./tmp");
  },
  filename: (req, file, cb) => {
    const [, extension] = file.originalname.split(".");
    cb(null, `${Date.now()}.${extension}`);
  },
});

const uploadMiddleware = multer({ storage });

router.post("/upload", uploadMiddleware.single("avatar"), uploadController);
router.use("/download", express.static("./tmp"));

module.exports = router;
