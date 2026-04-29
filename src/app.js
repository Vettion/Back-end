const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Rutas.
const consultRouter = require('./router/consultRouter.js');
const petRouter = require('./router/petRouter.js');

// URLs base.
app.use('/consult', consultRouter);
app.use('/pet', petRouter);

app.listen(8080, () => {
    console.log("Iniciando el backend en el puerto 8080");
});
