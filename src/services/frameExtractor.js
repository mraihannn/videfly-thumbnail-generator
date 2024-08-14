const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const fs = require("fs");
const {
  getFileUrlFromMinIO,
  uploadFileToMinIO,
} = require("../utils/minioStorage");

const extractKeyFrames = (videoPath) => {
  return new Promise((resolve, reject) => {
    const framesDir = path.resolve(__dirname, "../../temp/frames");

    // Buat folder frames jika belum ada
    if (!fs.existsSync(framesDir)) {
      fs.mkdirSync(framesDir, { recursive: true });
    }

    ffmpeg(videoPath)
      .on("filenames", (filenames) => {
        console.log(`Frames will be saved in: ${framesDir}`);
        console.log(`Extracted frames: ${filenames.join(", ")}`);
      })
      .on("end", async () => {
        try {
          console.log("Frame extraction completed.");

          // Unggah semua frame ke MinIO
          const frameFiles = fs.readdirSync(framesDir);
          const frameUrls = [];

          for (const file of frameFiles) {
            const filePath = path.join(framesDir, file);
            await uploadFileToMinIO(filePath, file);
            const fileUrl = await getFileUrlFromMinIO(file);
            frameUrls.push(fileUrl);
          }

          resolve(frameUrls);
        } catch (error) {
          reject(`Error uploading frames to MinIO: ${error.message}`);
        }
      })
      .on("error", (err) => {
        console.error(`Error during frame extraction: ${err.message}`);
        reject(`Error extracting frames: ${err.message}`);
      })
      .input(videoPath)
      .output(path.join(framesDir, "frame-%03d.png"))
      .outputOptions([
        "-vf",
        "select='eq(pict_type\\,I)',scale=320:-1",
        "-vsync",
        "vfr",
        "-q:v",
        "2",
      ])
      .run();
  });
};

module.exports = { extractKeyFrames };
