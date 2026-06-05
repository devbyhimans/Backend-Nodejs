const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || '',
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || '',
});

async function uploadImage(image) {
  try {
    const response = await imagekit.upload({
      file: image.buffer,
      fileName: image.originalname,
    });

    return response;
  } catch (err) {
    console.error("Image upload failed:", err);
    throw err;
  }
}

module.exports = uploadImage;