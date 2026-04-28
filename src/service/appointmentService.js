const db = require('../configuration/database.js').db;
const { homedir, platform } = require('os');

/**
 * Funcion para obtener todas las citas de la base de datos.
 * @returns 
 */
const findAllAppointments = (async () => {
    return await db('appointment').select('*');
});

/**
 * Funcion para obtener una cita específica por su ID.
 * @param {*} id_appointment 
 * @returns 
 */
const findAppointment = (async (id_appointment) => {
    return await db('appointment').select('*').where({ id_appointment: id_appointment }).first();
});

/**
 * Funcion para crear una nueva cita.
 * @param {*} appointment_date 
 * @param {*} start_hour 
 * @param {*} observations
 * @param {*} pet_id 
 * @param {*} room_id 
 * @param {*} veterinarian_dni 
 * @returns 
 */
const createAppointment = (async (appointment_date, start_hour, observations, pet_id, room_id, veterinarian_dni) =>{
    // Obtener la duración del servicio asociado a la sala para calcular la hora de fin de la cita
    const serviceDuration= await db('service').select('service.duration_minutes')
    .join('room', 'service.id_service', 'room.service_id')
    .where('room.id_room', room_id)
    .first();

    console.log("Resultado de la consulta:", serviceDuration);
    if(!serviceDuration){
        throw new Error("Service duration not found for the specified room.");
    }

    //Convertimos a minutos la hora de inicio y sumamos la duración del servicio.
    const [hours, minutes] = start_hour.split(':').map(Number);
    let totalMinutes = hours * 60 + minutes + serviceDuration.duration_minutes;

    //Convertimos el total de minutos de nuevo a formato HH:MM
    const endHours = Math.floor(totalMinutes / 60) % 24;
    const endMinutes = totalMinutes % 60;
    const end_hour = [endHours, endMinutes, 0].map(unit => String(unit).padStart(2, '0')).join(':');

    return await db('appointment').insert({
        appointment_date: appointment_date,
        start_hour: start_hour,
        end_hour: end_hour,
        observations: observations,
        pet_id: pet_id,
        room_id: room_id,
        veterinarian_dni: veterinarian_dni
    });
});

/**
 * Funcion para modificar una cita existente.
 * @param {*} id_appointment 
 * @param {*} appointment_date 
 * @param {*} start_hour 
 * @param {*} observations 
 * @param {*} pet_id 
 * @param {*} room_id 
 * @param {*} veterinarian_dni 
 * @returns 
 */
const modifyAppointment = (async (id_appointment, appointment_date, start_hour, observations, pet_id, room_id, veterinarian_dni) => {
    return await db('appointment').where({ id_appointment: id_appointment }).update({
        appointment_date: appointment_date,
        start_hour: start_hour,
        observations: observations,
        pet_id: pet_id,
        room_id: room_id,
        veterinarian_dni: veterinarian_dni
    });
});

/**
 * Funcion para eliminar una cita existente.
 * @param {*} id_appointment 
 * @returns 
 */
const removeAppointment = (async (id_appointment) => {
    return await db('appointment').where({ id_appointment: id_appointment }).del();
});

/**
 * Funcion para verificar si una cita existe por su id.
 * @param {*} id_appointment 
 * @returns 
 */
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