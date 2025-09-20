// gpt.js
import OpenAI from "openai";
import 'dotenv/config'; // cargar variables de entorno

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * Genera la respuesta de ChatGPT según los datos del formulario
 * @param {Object} data
 * @param {string} data.prompt Texto principal del prompt
 * @param {number} data.parrafos Número de párrafos
 * @param {number} data.preguntas Número de preguntas
 * @param {number} data.historias Número de historias relacionadas
 * @returns {Promise<string>} Respuesta generada por GPT
 */

export async function generarRespuesta({ prompt, parrafos, preguntas, historias }) {
  const promptCompleto = `${prompt} Explicalo en ${parrafos} parrafos, con ${preguntas} preguntas y ${historias} historia(s) relacionadas.
   Los parrafos deben venir en un <p> y las preguntas en una lista <ul><li>
   Si el prompt pide una tabla deberás traer la tabla en una etiqueta <table>, deberá incluir un <thead> asi como un <tbody> las filas en una etiqueta <tr> y las  celdas en una etiqueta <td>
   Debes entregar un titulo h1 relacionado al ${prompt} y deberá ir al inicio de la respuesta 
   Si te piden un diagrama de flujo entregado en una etiquete <div class="mermaid"> que internamente contenga en el lenguaje mermaid el diagrama`;

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Eres un tutor muy claro y educativo. No te sales de lo que te piden, Solo entregas parrafos en <p>, listas <ul>, <li> y historias relacionadas en <p>. Solo entrega tablas en etiquetas <table>,<tr> o <td>, de igual forma genera los <div> necesarios si te piden diagramas. No traigas etiquetas diferentes, aunque el promp te lo pida." },
        { role: "user", content: promptCompleto }
      ],
      max_tokens: 10000 // ajusta según lo que necesites
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error al generar respuesta:", error);
    return "Hubo un error al generar la respuesta.";
  }
}
