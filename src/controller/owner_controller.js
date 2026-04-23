const { response } = require('express');
const { findAllOwners, findOwner, ownerExistsByDni } = require('../service/owner_service');

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

module.exports = {
    getOwners,
    getOwner
}