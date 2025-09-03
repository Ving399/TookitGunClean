// app.js - Plantilla básica

// Importamos Express
const express = require('express');
const path = require('path');


// Importamos body-parser para parsear el cuerpo de las solicitudes
const bodyParser = require('body-parser');

// Inicializamos la aplicación Express
const app = express();

// Configuración de middleware
// Permite recibir datos en formato JSON desde el body
app.use(bodyParser.json());

// Permite recibir datos de formularios (application/x-www-form-urlencoded)
app.use(bodyParser.urlencoded({ extended: true }));

// Configuración del puerto
const PORT = 3000;

// Middleware para servir archivos estáticos (CSS, JS, imágenes)
app.use(express.static(path.join(__dirname, '../Frontend')));

// Middleware opcional para pruebas
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/index.html'));
});

app.post('/form', (req, res)=>{
    console.log('datos del formulario');
    console.log(req.body);
    res.send('Formulario recibido, revisa la consola');
});

// Levantar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
