const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3005;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/js', express.static(path.join(__dirname, 'js')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/', (req, res) => {
  const requestData = {
    tipo: req.body.opcionSeleccionada,
    cantidadRespuestas: req.body.cantidadRespuestas,
    mensaje: req.body.mensaje,
  };
  console.log(requestData)

  fetch('http://localhost:3040/api/chagpt/message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  })
    .then(response => response.json())
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      res.status(500).send('Error al obtener los datos desde el servicio.');
    });
});




app.post('/EnvioJira', (req, res) => {

  console.log("Llego aquii al app.js")
  fetch('localhost:3040/api/chagpt/jira', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req.body),
  })
    .then(response => response.json())
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      res.status(500).send('Error al conectar a jira.');
    });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});