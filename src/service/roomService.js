// Archivo en el que accedemos a la base de datos a por la informacion requerida y realizamos las operaciones de logica necesaria.

const db = require('../configuration/database.js').db;

/**
 * Función para obtener todas las salas.
 * @returns 
 */
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

/**
 * Función para obtener los datos de una sala por su code_room
 * @param {*} code_room 
 * @returns 
 */
const findRoomByCodeRoom = async (code_room) => {
    return await db('room')
        .where({ room_code: code_room })
        .first();
};

module.exports = {
    findAllRooms,
    findRoomByCodeRoom
};