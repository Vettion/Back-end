const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Rutas.
const ownerRouter = require('./router/owner_router.js');
const petRouter = require('./router/petRouter.js');

// URLs base.
app.use('/owner', ownerRouter);
app.use('/pet', petRouter);

app.listen(8080, () => {
    console.log("Iniciando el backend en el puerto 8080");
});
