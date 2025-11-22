// scan.js
const inputFile = document.getElementById("input-file");

inputFile.addEventListener("change", function() {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const img = new Image();
        img.src = e.target.result;
        img.onload = function() {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, canvas.width, canvas.height);

            if (code) {
                document.getElementById("result-text").textContent = "" + code.data;
            } else {
                alert("No QR code found in the selected image.");
            }
        };
    };
    reader.readAsDataURL(file);

    const copyBtn = document.getElementById("copy-btn");
const resultText = document.getElementById("result-text");

copyBtn.addEventListener("click", function () {
    const text = resultText.textContent.trim();
    if (!text) {
        alert("No result to copy.");
        return;
    }

    navigator.clipboard.writeText(text)
        .then(() => alert("Copied to clipboard!"))
        .catch(() => alert("Failed to copy."));
});

});
