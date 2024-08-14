const ffmpeg = require("fluent-ffmpeg");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const fileStorage = require("../utils/fileStorage");

const downloadVideo = async (videoUrl) => {
  const response = await axios({
    url: videoUrl,
    responseType: "stream",
  });

  const videoPath = path.resolve(__dirname, "../../temp/video.mp4");
  response.data.pipe(fs.createWriteStream(videoPath));

  return new Promise((resolve, reject) => {
    response.data.on("end", () => resolve(videoPath));
    response.data.on("error", reject);
  });
};

const extractMetadata = async (videoUrl) => {
  const videoPath = await downloadVideo(videoUrl);

  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(videoPath, (err, metadata) => {
      if (err) return reject(err);

      // Simpan metadata ke file
      const metadataToSave = {
        duration: metadata.format.duration,
        resolution: `${metadata.streams[0].width}x${metadata.streams[0].height}`,
        codec: metadata.streams[0].codec_name,
        bitrate: metadata.format.bit_rate,
        frameRate: metadata.streams[0].r_frame_rate,
      };

      fileStorage.saveMetadata(videoUrl, metadataToSave);

      resolve(metadataToSave);
    });
  });
};

module.exports = { extractMetadata };
