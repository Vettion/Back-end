const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Rutas.
const ownerRouter = require('./router/ownerRouter.js');
const consultRouter = require('./router/consultRouter.js');
const petRouter = require('./router/petRouter.js');

// URLs base.
app.use('/owners', ownerRouter);
app.use('/consults', consultRouter);
app.use('/pets', petRouter);

app.listen(8080, () => {
    console.log("Iniciando el backend en el puerto 8080");
});
