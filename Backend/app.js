// app.mjs - Plantilla básica con ES Modules

import express from "express";
import path from "path";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import { generarRespuesta } from "./gpt.js";
import cors from "cors"; // Enable CORS for cross-origin requests (useful for development/testing)

// Necesario para usar __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Inicializamos la aplicación Express
const app = express();

// Enable CORS for all routes
app.use(cors());

// Configuración de middleware
app.use(bodyParser.json()); // Para recibir JSON
app.use(bodyParser.urlencoded({ extended: true })); // Para recibir formularios

// Configuración del puerto
const PORT = process.env.PORT || 3000;

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, "../Frontend")));

// Ruta principal para servir index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/index.html"));
});

// Ruta para recibir el formulario
app.post("/form", async (req, res) => {
  const { prompt, "parrafos-number": parrafos, "reactivos-number": preguntas, "paginas-number": historias } = req.body;

  console.log("Datos del formulario:", req.body);

  // Llamamos a GPT, le pasamos el promtp con los numeros que nos dio el formulario y esperamos la respuesta
  //la respuesta se guarda en RespuestaGPT
  const respuestaGPT = await generarRespuesta({
    prompt,
    parrafos: Number(parrafos),
    preguntas: Number(preguntas),
    historias: Number(historias)
  });

  // Devolver la respuesta al frontend
  //al usar .json estamos metiendo la respuesta en un json, recuerdas que un json tiene clave y  contenido
  //respuesta es la clave que defines y contenido es respuestaGPT
  res.json({ respuesta: respuestaGPT });
  //res.send(`<h2>Respuesta de GPT:</h2><p>${respuestaGPT}</p>`);
});

// Levantar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
