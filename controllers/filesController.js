const fs = require("fs/promises");
const { User } = require("../db/userModel");

const uploadController = async (req, res, next) => {
  try {
    if (req.file) {
      const { _id } = req.user;
      const extention = req.file.filename.split(".")[1];
      const avatarURL = `public/avatars/${_id}.${extention}`;
      await fs.rename(`tmp/${req.file.filename}`, avatarURL);

      await User.findOneAndUpdate(
        { _id },
        {
          avatarURL,
        }
      );

      return res.status(200).json({ avatarURL });
    }
    res.status(400).json({ message: "Not valid file" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  uploadController,
};
