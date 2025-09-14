// Tomamos la respuesta que nos pasa el frontend desde la URL
const container = document.getElementById("respuesta-container");

// Obtenemos la información de la URL
const params = new URLSearchParams(window.location.search);
const respuesta = params.get("respuesta");

if (respuesta) {
  // Mostrar la respuesta tal cual (HTML burdo)
  container.innerHTML = respuesta;
} else {
  container.textContent = "No hay respuesta para mostrar.";
}
