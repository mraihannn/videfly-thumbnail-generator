document.getElementById("generate-btn").addEventListener("click", async () => {
  const videoUrl = document.getElementById("video-url").value;
  const generateBtn = document.getElementById("generate-btn");

  if (!videoUrl) {
    alert("Please enter a video URL.");
    return;
  }

  // Set loading state to true
  generateBtn.textContent = "Generating...";
  generateBtn.disabled = true;

  try {
    // Mengirim request ke backend untuk menghasilkan thumbnail
    const responseThumbnail = await fetch("/api/video/generate-thumbnail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ videoUrl }),
    });

    const dataThumbnail = await responseThumbnail.json();
    const { frames } = dataThumbnail;

    if (!frames || frames.length === 0) {
      alert("Failed to generate thumbnail. No frames extracted.");
      generateBtn.textContent = "Generate Thumbnail and Metadata";
      generateBtn.disabled = false;
      return;
    }

    // Menggunakan canvas untuk membuat animasi dari frame
    const canvas = document.getElementById("thumbnail-canvas");
    const ctx = canvas.getContext("2d");
    let currentFrame = 0;

    function animateFrames() {
      const img = new Image();
      img.src = frames[currentFrame];

      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };

      currentFrame = (currentFrame + 1) % frames.length;
    }

    setInterval(animateFrames, 500); // Ganti frame setiap 500ms

    // Mengirim request ke backend untuk mendapatkan metadata
    const responseMetadata = await fetch("/api/video/metadata", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ videoUrl }),
    });

    const metadata = await responseMetadata.json();
    displayMetadata(metadata);
  } catch (error) {
    console.error("Error generating thumbnail or metadata:", error);
    alert("Error generating thumbnail or metadata. Please try again.");
  } finally {
    generateBtn.textContent = "Generate Thumbnail and Metadata";
    generateBtn.disabled = false;
  }
});

function displayMetadata(metadata) {
  const metadataList = document.getElementById("metadata-list");

  // Clear previous metadata
  metadataList.innerHTML = "";

  if (!metadata) {
    metadataList.innerHTML = "<li>No metadata available.</li>";
    return;
  }

  // Add metadata to the list
  const metadataItems = [
    `Duration: ${metadata.duration} seconds`,
    `Resolution: ${metadata.resolution}`,
    `Codec: ${metadata.codec}`,
    `Bitrate: ${metadata.bitrate} bps`,
    `Frame Rate: ${metadata.frameRate}`,
  ];

  metadataItems.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    metadataList.appendChild(li);
  });
}
