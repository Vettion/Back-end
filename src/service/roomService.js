// Archivo en el que accedemos a la base de datos a por la informacion requerida y realizamos las operaciones de logica necesaria.

const db = require('../configuration/database.js').db;

const findAllRooms = async () => {
    const rooms = await db('room')
        .select(
            'room_code',
            'name',
            'type',
            'is_free',
            'location'
        );
    return rooms;
};

const findRoomByCodeRoom = async (code_room) => {
    return await db('room')
        .where({ room_code: code_room })
        .first();
};

module.exports = {
    findAllRooms,
    findRoomByCodeRoom
};