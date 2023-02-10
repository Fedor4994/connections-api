const uploadController = async (req, res, next) => {
  try {
    res.status(200).json({ filename: req.file.filename });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  uploadController,
};
