const express = require('express');
const cors = require('cors');
const appointmentRouter = require('./router/appointmentRouter.js');
const cleanServiceRouter = require('./router/cleanServiceRouter.js');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/appointments', appointmentRouter);
app.use('/clean_services', cleanServiceRouter);

app.listen(8080, () => {
    console.log("Iniciando el backend en el puerto 8080");
});
