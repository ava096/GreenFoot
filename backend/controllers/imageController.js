const uploadToCloudinary = require("../config/uploadImage");

// @desc    Upload new image
// @route   POST/uploadImage
// @access  Private
const uploadImage = (req, res) => {
  uploadToCloudinary(req.body.image)
    .then((url) => res.json({ url }))
    .catch((err) => res.status(500).json({ error: err.message }));
};

module.exports = { uploadImage };
