// Este archivo contiene la lista de todas las operaciones definidas en el /controller/registerController.js

const express = require('express');
const router = express.Router();

const { getAllRegisters, getRegistersByPetId } = require("../controller/registerController");
const { validateRegisterIdPet } = require("../validators/register");

//Rutas
router.get('/', getAllRegisters);
router.get('/pet/:id_pet',validateRegisterIdPet, getRegistersByPetId);

module.exports = router;