// 1. Importamos dotenv para leer variables de entorno
import dotenv from "dotenv";
dotenv.config();

// 2. Importamos la librería oficial de OpenAI
import OpenAI from "openai";

// 3. Creamos el cliente de OpenAI usando la API Key
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// 4. Función async para hacer la llamada a OpenAI
async function runPrompt() {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Eres un maestro de univeridad experto en biologia" },
        { role: "user", content: "Explicame la fotosintesis en 3 parrafos, con 2 preguntas y 1 historia divertida de 1 parrafo ." }
      ],
      max_tokens: 600  // limita la respuesta a ~100 tokens
    });

    // 5. Mostramos la respuesta en consola
    console.log(response.choices[0].message.content);
  } catch (error) {
    console.error("Error al llamar a OpenAI:", error);
  }
}

// 6. Ejecutamos la función
runPrompt();
