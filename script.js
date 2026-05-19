const input = document.getElementById("imageInput");
const beforeImg = document.getElementById("beforeImg");
const afterImg = document.getElementById("afterImg");
const enhanceBtn = document.getElementById("enhanceBtn");
const downloadBtn = document.getElementById("downloadBtn");
const loading = document.getElementById("loading");

const API_KEY = "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";

let fileData = null;

// Upload image
input.addEventListener("change", () => {
  const file = input.files[0];
  if (!file) return;

  fileData = file;
  beforeImg.src = URL.createObjectURL(file);
});

// REAL AI ENHANCEMENT
enhanceBtn.addEventListener("click", async () => {
  if (!fileData) return alert("Upload image first!");

  loading.style.display = "block";

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-x4-upscaler",
      {
        method: "POST",
        headers: {
          "Authorization": "Bearer " + API_KEY
        },
        body: fileData
      }
    );

    if (!response.ok) {
      throw new Error("API Error");
    }

    const blob = await response.blob();
    const imageURL = URL.createObjectURL(blob);

    afterImg.src = imageURL;
    downloadBtn.disabled = false;

  } catch (error) {
    alert("Error: " + error.message);
  }

  loading.style.display = "none";
});

// Download
downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.href = afterImg.src;
  link.download = "enhanced.png";
  link.click();
});
