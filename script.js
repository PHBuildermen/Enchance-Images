const input = document.getElementById("imageInput");
const beforeImg = document.getElementById("beforeImg");
const afterImg = document.getElementById("afterImg");
const enhanceBtn = document.getElementById("enhanceBtn");
const downloadBtn = document.getElementById("downloadBtn");
const loading = document.getElementById("loading");

let imageURL = "";

input.addEventListener("change", () => {
  const file = input.files[0];
  if (!file) return;

  imageURL = URL.createObjectURL(file);
  beforeImg.src = imageURL;
});

enhanceBtn.addEventListener("click", () => {
  if (!imageURL) return alert("Upload image first!");

  loading.style.display = "block";

  setTimeout(() => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = new Image();
    img.src = imageURL;

    img.onload = () => {
      canvas.width = img.width * 2;
      canvas.height = img.height * 2;

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      afterImg.src = canvas.toDataURL();
      loading.style.display = "none";
      downloadBtn.disabled = false;
    };
  }, 1500);
});

downloadBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.href = afterImg.src;
  link.download = "enhanced.png";
  link.click();
});
