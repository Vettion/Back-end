const express = require('express');
const cors = require('cors');
const owner = require('./router/owner_router.js');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', owner);

app.listen(8080, () => {
    console.log("Iniciando el backend en el puerto 8080");
});
