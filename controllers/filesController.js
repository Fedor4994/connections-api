const uploadController = async (req, res, next) => {
  try {
    if (req.file) {
      return res.status(200).json({ filename: req.file.filename });
    }
    res.status(400).json({ message: "File is required" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  uploadController,
};
