// Este archivo implementa las operaciones que se han definifo en el router/roomRouter.js

const { findAllRooms, findRoomByCodeRoom } = require('../service/roomService.js');

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

const getRoomByCodeRoom = async (req, res, next) => {
    try {
        const { code_room } = req.params;
        const room = await findRoomByCodeRoom(code_room);

        if (!room) {
            return res.status(404).json({
                code: 404,
                title: 'success',
                message: `Room with code room ${code_room} not found.`
            })
        }

        res.status(200).json({
            code: 200,
            title: 'success',
            message: 'Room retrieved successfully',
            data: room
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllRooms,
    getRoomByCodeRoom
}