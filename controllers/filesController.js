const { User } = require("../db/userModel");
const { Storage } = require("@google-cloud/storage");
const path = require("path");
const { Contact } = require("../db/contactModel");

const uploadController = async (req, res, next) => {
  try {
    if (req.file) {
      const { _id } = req.user;
      const storage = new Storage();
      const bucket = storage.bucket("connections-api");
      const tmpPath = path.resolve(`./tmp/${req.file.filename}`);
      await bucket.upload(tmpPath);

      const [metaData] = await bucket.file(req.file.filename).getMetadata();
      const avatarURL = metaData.mediaLink;

      if (req.params.contactId) {
        await Contact.findOneAndUpdate(
          { _id: req.params.contactId, userId: _id },
          {
            avatarURL,
          }
        );
      } else {
        await User.findOneAndUpdate(
          { _id },
          {
            avatarURL,
          }
        );
      }

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
