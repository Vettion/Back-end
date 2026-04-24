const { response } = require('express');
const { findAllAppointments, findAppointment, appointmentExistsById } = require('../service/appointment_service');

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

module.exports = {
    getAppointments,
    getAppointment
}