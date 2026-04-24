const { response } = require('express');
const { findAllAppointments, findAppointment, createAppointment, appointmentExistsById } = require('../service/appointment_service');

const getAppointments = (async (req, res) => {
    const appointments = await findAllAppointments();
    return res.status(200).json(appointments);
});

const getAppointment = (async (req, res) => {
    const id_appointment = req.params.id_appointment;

    if (! await appointmentExistsById(id_appointment)) {
        return res.status(404).json({
            code: 404,
            title: 'not found',
            message: 'The appointment has not been found'
        });
    }

    const appointment = await findAppointment(id_appointment);
    res.status(200).json(appointment);
});

const postAppointment = async (req, res) => {
    const appointment_date = req.body.appointment_date;
    const start_hour = req.body.start_hour;
    const duration = req.body.duration;
    const reason = req.body.reason;
    const pet_id = req.body.pet_id;
    const room_id = req.body.room_id;
    const veterinarian_dni = req.body.veterinarian_dni;

    await createAppointment(appointment_date, start_hour, duration, reason, pet_id, room_id, veterinarian_dni);
    res.status(201).json({
        code: 201,
        title: 'created',
        message: 'The appointment has been created.'
    });
}

module.exports = {
    getAppointments,
    getAppointment,
    postAppointment
}