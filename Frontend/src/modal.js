
const btnAbrirModal = document.querySelector('#create-button');
const btnCerrarModal = document.querySelector('#btn-close-modal')
const modal = document.querySelector('#modal');

btnAbrirModal.addEventListener('click', () => {
    modal.showModal();
});

btnCerrarModal.addEventListener('click', ()=> {
  modal.close();
})

//Variable que selecicona el formulario
const form = document.querySelector("form"); // seleccionamos el formulario

// ---Funcion de envio del formulario----
//ENVIA ESTE FORMULARIO CON EL METODO POST A /FORM
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // Evita que el formulario se envíe de forma tradicional y recargue la página

  // 1️⃣ Tomamos los valores del formulario
  //tomas el id del input
  const prompt = document.getElementById("prompt").value;
  const parrafos = Number(document.getElementById("parrafo").value);
  const preguntas = Number(document.getElementById("reactivos").value);
  const historias = Number(document.getElementById("historias").value);
  const tabla = document.getElementById("tabla").value;
  const diagrama = document.getElementById("diagrama").value;

  try {
    // 2️⃣ Llamamos al backend usando fetch (relative for unified deployment)
    const response = await fetch(`/form`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt,
        tabla,
        diagrama,
        "parrafos-number": parrafos,
        "reactivos-number": preguntas,
        "hisotorias-number": historias //paginas-number
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



