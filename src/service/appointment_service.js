const db = require('../configuration/database.js').db;
const { homedir, platform } = require('os');

const findAllAppointments = (async () => {
    return await db('appointment').select('*');
});

const findAppointment = (async (id_appointment) => {
    return await db('appointment').select('*').where({ id_appointment: id_appointment }).first();
});

const createAppointment = (async (appointment_date, start_hour, duration, reason, pet_id, room_id, veterinarian_dni) =>{
    return await db('appointment').insert({
        appointment_date: appointment_date,
        start_hour: start_hour,
        duration: duration,
        reason: reason,
        pet_id: pet_id,
        room_id: room_id,
        veterinarian_dni: veterinarian_dni
    });
});

const modifyAppointment = (async (id_appointment, appointment_date, start_hour, duration, reason, pet_id, room_id, veterinarian_dni) => {
    return await db('appointment').where({ id_appointment: id_appointment }).update({
        appointment_date: appointment_date,
        start_hour: start_hour,
        duration: duration,
        reason: reason,
        pet_id: pet_id,
        room_id: room_id,
        veterinarian_dni: veterinarian_dni
    });
});

const removeAppointment = (async (id_appointment) => {
    return await db('appointment').where({ id_appointment: id_appointment }).del();
});

const appointmentExistsById = async (id_appointment) => {
    const appointment = await db('appointment').where('id_appointment', id_appointment).first();
    return appointment != null;
}

module.exports = {
    findAllAppointments,
    findAppointment,
    createAppointment,
    modifyAppointment,
    removeAppointment,
    appointmentExistsById
}