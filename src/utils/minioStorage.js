const Minio = require("minio");

// Konfigurasi MinIO Client
const minioClient = new Minio.Client({
  endPoint: "play.min.io",
  port: 9000,
  useSSL: true,
  accessKey: "Q3AM3UQ867SPQQA43P2F",
  secretKey: "zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG",
});

// Buat bucket jika belum ada
const bucketName = "thumbnails";
minioClient.bucketExists(bucketName, (err, exists) => {
  if (err) {
    console.error("Error checking bucket:", err);
    return;
  }
  if (!exists) {
    minioClient.makeBucket(bucketName, "us-east-1", (err) => {
      if (err) console.error("Error creating bucket:", err);
      else console.log("Bucket created successfully.");
    });
  }
});

// Fungsi untuk mengunggah file ke MinIO
const uploadFileToMinIO = (filePath, objectName) => {
  return new Promise((resolve, reject) => {
    minioClient.fPutObject(bucketName, objectName, filePath, (err, etag) => {
      if (err) return reject(err);
      console.log("File uploaded successfully:", etag);
      resolve(etag);
    });
  });
};

// Fungsi untuk mengambil URL file dari MinIO
const getFileUrlFromMinIO = (objectName) => {
  return new Promise((resolve, reject) => {
    minioClient.presignedGetObject(
      bucketName,
      objectName,
      24 * 60 * 60,
      (err, url) => {
        // URL valid selama 24 jam
        if (err) return reject(err);
        resolve(url);
      }
    );
  });
};

module.exports = {
  uploadFileToMinIO,
  getFileUrlFromMinIO,
};
