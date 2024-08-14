const metadataService = require("../services/metadataServices");

const getMetadata = async (req, res) => {
  const { videoUrl } = req.body;

  if (!videoUrl) {
    return res.status(400).json({ message: "Video URL is required" });
  }

  try {
    const metadata = await metadataService.extractMetadata(videoUrl);
    res.json(metadata);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to extract metadata", error: error.message });
  }
};

module.exports = { getMetadata };
