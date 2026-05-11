const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Rutas.
const ownerRouter = require('./router/ownerRouter.js');
const serviceRouter = require('./router/serviceRouter.js');
const petRouter = require('./router/petRouter.js');
const appointmentRouter = require('./router/appointmentRouter.js');
const cleanServiceRouter = require('./router/cleanServiceRouter.js');
const allergyRouter = require('./router/allergyRouter.js');
const cleanerRouter = require('./router/cleanerRouter.js');
const veterinarianRouter = require('./router/veterinarianRouter.js');

// URLs base.
app.use('/owners', ownerRouter);
app.use('/services', serviceRouter);
app.use('/pets', petRouter);
app.use('/appointments', appointmentRouter);
app.use('/clean_services', cleanServiceRouter);
app.use('/allergies', allergyRouter);
app.use('/cleaners', cleanerRouter);
app.use('/veterinarians', veterinarianRouter);

// Manejo de errores. En caso de que ocurra un error en alguna de las rutas, se capturará aquí y se enviará una respuesta al cliente.
app.use((err, req, res, next) => {
    console.error(err.stack);

    const message = err.message || "Internal Server Error";
    const status = err.status || 500;

    res.status(status).json({
        code: status,
        title: "Error",
        message: message
    });
});

app.listen(8080, () => {
    console.log("Iniciando el backend en el puerto 8080");
});
