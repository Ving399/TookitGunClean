
const BACKEND_URL = " https://backend-qg8ihvqsh-vings-projects-d703a66a.vercel.app";
const btnAbrirModal = document.querySelector('#create-button');
const btnCerrarModal = document.querySelector('#btn-close-modal')
const modal = document.querySelector('#modal');

btnAbrirModal.addEventListener('click', () => {
    modal.showModal();
});

btnCerrarModal.addEventListener('click', ()=> {
  modal.close();
})

const form = document.querySelector("form"); // seleccionamos el formulario

// ---Funcion de envio del formulario----

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Evita que el formulario se envíe de forma tradicional y recargue la página

  // 1️⃣ Tomamos los valores del formulario
  const prompt = document.getElementById("prompt").value;
  const parrafos = Number(document.getElementById("number-p").value);
  const preguntas = Number(document.getElementById("number-r").value);
  const historias = Number(document.getElementById("number-pages").value);

  try {
    // 2️⃣ Llamamos al backend usando fetch ${BACKEND_URL}
    const response = await fetch(`/form`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt,
        "parrafos-number": parrafos,
        "reactivos-number": preguntas,
        "paginas-number": historias
      })
    });

    // 3️⃣ Obtenemos la respuesta JSON
    const data = await response.json();

    // 4️⃣ Redirigimos a la nueva página pasando la respuesta en la URL
    const url = `/respuesta.html?respuesta=${encodeURIComponent(data.respuesta)}`;
    window.location.href = url;

  } catch (error) {
    console.error("Error al obtener la respuesta:", error);
    alert("Hubo un problema al generar la respuesta. Intenta de nuevo.");
  }
});



