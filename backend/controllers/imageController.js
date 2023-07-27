const uploadToCloudinary = require("../config/cloudinary");

// @desc    Upload new image
// @route   POST/uploadImage
// @access  Private
const uploadImage = async (req, res) => {
  try {
    const result = await uploadToCloudinary(req.body.image);
    res.json({ url: result.url, public_id: result.public_id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { uploadImage };
