const { response } = require('express');
const { findAllOwners, findOwner, addOwner, editOwner, removeOwner, ownerExistsByDni } = require('../service/owner_service');

const getOwners = (async (req, res) => {
    const owners = await findAllOwners();
    return res.status(200).json(owners);
});

const getOwner = (async (req, res) => {
    const dni = req.params.dni;

    if (! await ownerExistsByDni(dni)) {
        return res.status(404).json({
            code: 404,
            title: 'not found',
            message: 'The owner has not been found'
        });
    }

    const owner = await findOwner(dni);
    res.status(200).json(owner);
});

const postOwner = (async (req, res) => {
    const dni = req.body.dni;

    if (await ownerExistsByDni(dni)) {
        return res.status(409).json({
            code: 409,
            title: 'conflict',
            message: 'The owner is already on the database.'
        });
    }

    const name = req.body.name;
    const surname = req.body.surname;
    const phone = req.body.phone;
    const email = req.body.email;

    await addOwner(dni, name, surname, phone, email);

    res.status(201).json({
        code: 201,
        title: 'added',
        message: 'The owner has been added correctly.'
    });
});

const putOwner = (async (req, res) => {
    const dni = req.params.dni;

    if (!await ownerExistsByDni(dni)){
        return res.status(404).json({
            code: 404,
            title: 'not-found',
            message: 'The owner has not been found.'
        });
    }

    const name= req.body.name;
    const surname= req.body.surname;
    const phone= req.body.phone;
    const email= req.body.email;

    await editOwner(dni, name, surname, phone, email);
    res.status(204).end();
});

const deleteOwner=(async (req, res) => {
    const dni = req.params.dni;

    if(!await ownerExistsByDni(dni)){
        return res.status(404).json({
            code: 404,
            title: 'not-found',
            message: 'The owner has not been found.'
        });
    }

    await removeOwner(dni);
    res.status(204).end();
});

module.exports = {
    getOwners,
    getOwner,
    postOwner,
    putOwner,
    deleteOwner
}