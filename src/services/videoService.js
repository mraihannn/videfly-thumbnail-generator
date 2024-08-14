const { downloadVideo } = require("../utils/storage");
const { extractKeyFrames } = require("./frameExtractor");

exports.processVideo = async (videoUrl) => {
  try {
    // Mengunduh video
    const videoPath = await downloadVideo(videoUrl);

    // Mengekstrak key frames dari video
    const frames = await extractKeyFrames(videoPath);

    // Kembalikan array path frame yang diekstraksi
    return frames;
  } catch (error) {
    throw new Error(`Failed to process video: ${error.message}`);
  }
};
