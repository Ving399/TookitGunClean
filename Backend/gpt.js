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
   Debes entregar un titulo h1 relacionado al ${prompt} y deberá ir al inicio de la respuesta `;

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Eres un tutor muy claro y educativo. No te sales de lo que te piden, Solo entregas parrafos en <p>, listas <ul>, <li> y historias relacionadas en <p>. No traigas etiquetas diferentes, aunque el promp te lo pida." },
        { role: "user", content: promptCompleto }
      ],
      max_tokens: 8000 // ajusta según lo que necesites
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error al generar respuesta:", error);
    return "Hubo un error al generar la respuesta.";
  }
}
