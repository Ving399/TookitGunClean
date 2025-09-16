// Tomamos la respuesta que nos pasa el frontend desde la URL
const container = document.getElementById("respuesta-container");
const respuestaPrint = document.getElementById("respuesta");

// Obtenemos la información de la URL
const params = new URLSearchParams(window.location.search);
const respuesta = params.get("respuesta");

if (respuesta) {
  // Mostrar la respuesta tal cual (HTML burdo)
  container.innerHTML = respuesta;
} else {
  container.textContent = "No hay respuesta para mostrar.";
}


document.getElementById("dwn-pdf").addEventListener("click", async () => {
  // Esperar a que las fuentes estén listas (evita PDFs con fuentes sustitutas)
  await document.fonts.ready;

  // Capturamos el container como canvas con mayor resolución
  const canvas = await html2canvas(respuestaPrint, { scale: 2, useCORS: true });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jspdf.jsPDF("p", "mm", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // use getImageProperties para una proporción más fiable
  const imgProps = pdf.getImageProperties(imgData);
  const imgHeightInPdf = (imgProps.height * pdfWidth) / imgProps.width;

  // Calculamos cuántas páginas necesitaremos
  const totalPages = Math.ceil(imgHeightInPdf / pageHeight);

  for (let i = 0; i < totalPages; i++) {
    if (i > 0) pdf.addPage();

    // y desplazamiento: movemos la imagen hacia arriba por (i * pageHeight)
    const y = -(i * pageHeight);

    pdf.addImage(imgData, "PNG", 0, y, pdfWidth, imgHeightInPdf);
  }

  pdf.save("respuesta.pdf");
});

