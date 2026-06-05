const ImageKit = require("@imagekit/nodejs");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY || '',
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT || '',
});

async function uploadMusic(buffer) {
  try {
    console.log("Before ImageKit upload");

    const response = await imagekit.files.upload({
      file: buffer.toString("base64"),
      fileName: `music_${Date.now()}.mp3`,
      folder: "/Spotify",
    });

    console.log("After ImageKit upload");

    return response;
  } catch (err) {
    console.error("Music upload failed:", err);
    throw err;
  }
}

module.exports = {uploadMusic};