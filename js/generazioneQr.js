function generateQRCode() {
  var textToEncode = "https://perri-alessandro.github.io/QR-CODE-PAGE-ZIO/";

  // Configurazioni opzionali
  var options = {
    width: 128,
    height: 128,
    colorDark: "#000BFF",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H,
  };

  // Creazione del QR code
  var qrcode = new QRCode(document.getElementById("qrcode"), options);
  qrcode.makeCode(textToEncode);
  console.log("OGGETTO QR CODE GENERATO", qrcode);
}

function downloadQRCode() {
  var canvas = document
    .getElementById("qrcode")
    .getElementsByTagName("canvas")[0];

  var borderedCanvas = document.createElement("canvas");
  var ctx = borderedCanvas.getContext("2d");
  var borderSize = 8; // pixel

  borderedCanvas.width = canvas.width + 2 * borderSize;
  borderedCanvas.height = canvas.height + 2 * borderSize;

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, borderedCanvas.width, borderedCanvas.height);

  // Disegnare il QR code al centro del nuovo canvas
  ctx.drawImage(canvas, borderSize, borderSize);

  // Creare un link di download
  var downloadLink = document.createElement("a");
  downloadLink.href = borderedCanvas.toDataURL("image/png");
  downloadLink.download = "brano_qr_code.png";

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  console.log("QR CODE SCARICATO", downloadLink);
}

// Chiamata alla funzione per generare il QR code al caricamento della pagina
generateQRCode();

document
  .getElementById("downloadButton")
  .addEventListener("click", downloadQRCode);
