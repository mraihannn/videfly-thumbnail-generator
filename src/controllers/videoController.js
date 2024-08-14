const { extractKeyFrames } = require("../services/frameExtractor");
const { getFileUrlFromMinIO } = require("../utils/minioStorage");

const generateThumbnail = async (req, res, next) => {
  const { videoUrl } = req.body;

  try {
    // Check if the thumbnail already exists in MinIO
    // const objectName = `thumbnail-${videoUrl.split("/").pop()}.gif`; // Nama file bisa diubah sesuai keperluan
    // try {
    //   const existingThumbnailUrl = await getFileUrlFromMinIO(objectName);
    //   return res.json({ frames: [existingThumbnailUrl] });
    // } catch (err) {
    //   if (err.code !== "NoSuchKey") {
    //     // Jika error bukan karena tidak adanya objek, lempar error
    //     console.log("Thumbnail not found in cache, generating a new one.");
    //     return next(err);
    //   }
    //   console.log("Thumbnail not found in cache, generating a new one.");
    // }

    // Jika tidak ada di cache, generate thumbnail baru
    const frames = await extractKeyFrames(videoUrl);

    res.json({ frames });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generateThumbnail,
};
