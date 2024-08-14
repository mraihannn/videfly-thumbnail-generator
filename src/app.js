const express = require("express");
const videoRoutes = require("./routes/videoRoutes");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/video", videoRoutes);

// Serving frontend static files
app.use(express.static(path.join(__dirname, "frontend")));

// Middleware untuk melayani file frame dari direktori temp/frames
app.use("/frames", express.static(path.join(__dirname, "../temp/frames")));

// Error handling middleware (Optional)
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
