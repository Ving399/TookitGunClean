// Tomamos la respuesta que nos pasa el frontend desde la URL
const container = document.getElementById("respuesta-container");
const respuestaPrint = document.getElementById("respuesta");

// Obtenemos la información de la URL
const params = new URLSearchParams(window.location.search);
const respuesta = params.get("respuesta");

if (respuesta) {
  // Mostrar la respuesta tal cual (HTML burdo)
  container.innerHTML = respuesta;

  // Una vez insertado el HTML, inicializamos Mermaid
  inicializarMermaid();
} else {
  container.textContent = "No hay respuesta para mostrar.";
}

// ---- FUNCION PARA LOS DIAGRAMAS CON MERMAID ----
function inicializarMermaid() {
  if (typeof mermaid === "undefined") return;

  mermaid.initialize({ startOnLoad: false });

  // Buscar todos los divs que contengan código Mermaid
  const mermaidDivs = container.querySelectorAll("div");

  mermaidDivs.forEach((div, index) => {
    // Si el contenido tiene "graph" o "flowchart", lo tomamos como diagrama Mermaid
    if (div.textContent.includes("graph") || div.textContent.includes("flowchart")) {
      const code = div.textContent.trim();

      // Renderizar el diagrama dentro del div
      mermaid.render(`mermaid-${index}`, code, (svgCode) => {
        div.innerHTML = svgCode;
      });
    }
  });
}

// ---- BOTÓN PDF ----
document.getElementById("dwn-pdf").addEventListener("click", async () => {
  await document.fonts.ready;

  const canvas = await html2canvas(respuestaPrint, { scale: 2, useCORS: true });
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jspdf.jsPDF("p", "mm", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const imgProps = pdf.getImageProperties(imgData);
  const imgHeightInPdf = (imgProps.height * pdfWidth) / imgProps.width;

  const totalPages = Math.ceil(imgHeightInPdf / pageHeight);

  for (let i = 0; i < totalPages; i++) {
    if (i > 0) pdf.addPage();
    const y = -(i * pageHeight);
    pdf.addImage(imgData, "PNG", 0, y, pdfWidth, imgHeightInPdf);
  }

  pdf.save("respuesta.pdf");
});
