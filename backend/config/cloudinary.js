const cloudinary = require("cloudinary").v2;

//Boilerplate from CLoudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const opts = {
  overwrite: true,
  invalidate: true,
  resource_type: "auto",
};

//image is in base64 format
module.exports = (image) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(image, opts, (error, result) => {
      if (result && result.secure_url) {
        return resolve({ url: result.secure_url, public_id: result.public_id });
      }
      console.log(error.message);
      return reject({ message: error.message });
    });
  });
};
