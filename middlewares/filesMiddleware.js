const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "tmp/");
  },
  filename: (req, file, cb) => {
    const [, extension] = file.originalname.split(".");
    if (req.params.contactId) {
      cb(null, `${req.params.contactId}.${extension}`);
    } else {
      cb(null, `${req.user._id}.${extension}`);
    }
  },
});

const types = ["image/png", "image/jpg", "image/jpeg"];

const fileFilter = (req, file, cb) => {
  if (types.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploadMiddleware = multer({ storage, fileFilter });

module.exports = {
  uploadMiddleware,
};
