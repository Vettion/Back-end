// Archivo en el que accedemos a la base de datos a por la informacion requerida y realizamos las operaciones de logica necesaria.

const db = require('../configuration/database.js').db;

const findAllRooms = async () => {
    const rooms = await db('room')
        .join('service', 'room.service_id', 'service.id_service')
        .select(
            'room.id_room',
            'room.name',
            'room.disponibility',
            'service.name_service as service_name',
            'service.price as service_price'
        );
    return rooms;
}

module.exports = {
    findAllRooms
}
