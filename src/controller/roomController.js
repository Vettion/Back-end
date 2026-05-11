// Este archivo implementa las operaciones que se han definifo en el router/roomRouter.js

const { findAllRooms } = require('../service/roomService.js');

const getAllRooms = async (req, res, next) => {
    try {
        const rooms = await findAllRooms();

        res.status(200).json({
            code: 200,
            title: 'success',
            message: 'Rooms retrieved successfully',
            data: rooms
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllRooms
}