const express = require('express');
const cors = require('cors');
const owner = require('./router/ownerRouter.js');

const app = express();
app.use(cors());
app.use(express.json());

// Rutas.
const petRouter = require('./router/petRouter.js');

// URLs base.
app.use('/', petRouter);

app.listen(8080, () => {
    console.log("Iniciando el backend en el puerto 8080");
});
