const fs = require("fs");
const path = require("path");
const metadataFile = path.resolve(__dirname, "../../data/metadata.json");

const saveMetadata = (videoUrl, metadata) => {
  let metadataList = [];

  // Cek jika file metadata.json ada
  if (fs.existsSync(metadataFile)) {
    // Baca file dan tangani jika file kosong atau format tidak valid
    try {
      const fileContent = fs.readFileSync(metadataFile);
      if (fileContent.length > 0) {
        metadataList = JSON.parse(fileContent);
      }
    } catch (err) {
      console.error("Error parsing JSON from file:", err.message);
      // Jika parsing gagal, mulai dengan array kosong
      metadataList = [];
    }
  }

  // Cek apakah metadata untuk video URL sudah ada
  const existingMetadata = metadataList.find((m) => m.videoUrl === videoUrl);
  if (existingMetadata) {
    Object.assign(existingMetadata, metadata);
  } else {
    metadataList.push({ videoUrl, ...metadata });
  }

  // Simpan metadata yang telah diperbarui
  fs.writeFileSync(metadataFile, JSON.stringify(metadataList, null, 2));
};

module.exports = { saveMetadata };
