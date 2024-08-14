const axios = require("axios");
const fs = require("fs");
const path = require("path");

exports.downloadVideo = async (videoUrl) => {
  try {
    const videoName = `video_${Date.now()}.mp4`;
    const videoPath = path.resolve(__dirname, "../../temp", videoName);
    const writer = fs.createWriteStream(videoPath);

    const response = await axios({
      url: videoUrl,
      method: "GET",
      responseType: "stream",
    });

    // Menggunakan pipe untuk menulis stream ke file
    response.data.pipe(writer);

    // Mengembalikan Promise yang selesai ketika video selesai diunduh
    return new Promise((resolve, reject) => {
      writer.on("finish", () => resolve(videoPath));
      writer.on("error", reject);
    });
  } catch (error) {
    throw new Error(`Failed to download video: ${error.message}`);
  }
};
