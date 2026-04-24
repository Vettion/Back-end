const db = require('../configuration/database.js').db;
const { homedir, platform } = require('os');

const findAllAppointments = (async () => {
    return await db('appointment').select('*');
});

const findAppointment = (async (id_appointment) => {
    return await db('appointment').select('*').where({ id_appointment: id_appointment }).first();
});

const appointmentExistsById = async (id_appointment) => {
    const appointment = await db('appointment').where('id_appointment', id_appointment).first();
    return appointment != null;
}

module.exports = {
    findAllAppointments,
    findAppointment,
    appointmentExistsById
}