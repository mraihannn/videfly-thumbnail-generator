const express = require("express");
const videoController = require("../controllers/videoController");
const metadataController = require("../controllers/metadataController");

const router = express.Router();

router.post("/generate-thumbnail", videoController.generateThumbnail);
router.post("/metadata", metadataController.getMetadata);

module.exports = router;
