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
  const promptCompleto = `${prompt} Explicalo en ${parrafos} parrafos, con ${preguntas} preguntas y ${historias} historia(s) relacionadas.`;

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Eres un tutor muy claro y educativo." },
        { role: "user", content: promptCompleto }
      ],
      max_tokens: 500 // ajusta según lo que necesites
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error al generar respuesta:", error);
    return "Hubo un error al generar la respuesta.";
  }
}
