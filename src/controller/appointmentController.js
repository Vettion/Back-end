const { response } = require("express");
const { findAllAppointments, findAppointment, createAppointment, modifyAppointment, removeAppointment, appointmentExistsById } = require("../service/appointmentService");
const { title } = require("node:process");

/**
 * Función para obtener una lista de todas las citas.
 * Se encarga de manejar la solicitud GET /vettion/appointments.
 * @param {*} req Objeto de solicitud.
 * @param {*} res Objeto de respuesta.
 * @returns Devuelve un JSON estandarizado con el código de estado 200 y un array de todas las citas.
 */
const getAppointments = async (req, res) => {
    const appointments = await findAllAppointments();
    return res.status(200).json(appointments);
};

/**
 * Función para obtener una cita específica por su id.
 * Se encarga de manejar la solicitud GET /vettion/appointments/:id_appointment.
 * @param {*} req Objeto de solicitud.
 * @param {*} res Objeto de respuesta.
 * @returns Devuelve un JSON estandarizado con el código de estado 200 y los datos de la cita solicitada
 * o el código de estado 404 si no se encuentra.
 */
const getAppointment = async (req, res) => {
    const id_appointment = req.params.id_appointment;

    if (!(await appointmentExistsById(id_appointment))) {
        return res.status(404).json({
            code: 404,
            title: "not found",
            message: "The appointment has not been found",
        });
    }

    const appointment = await findAppointment(id_appointment);
    res.status(200).json(appointment);
};

/**
 * Función para crear una nueva cita.
 * Se encarga de manejar la solicitud POST /vettion/appointments.
 * @param {*} req Objeto de solicitud.
 * @param {*} res Objeto de respuesta.
 * @returns Devuelve un JSON estandarizado con el código de estado 201 y un mensaje de confirmación.
 */
const postAppointment = async (req, res) => {
    const appointment_date = req.body.appointment_date;
    const start_hour = req.body.start_hour;
    const observations = req.body.observations;
    const pet_id = req.body.pet_id;
    const room_id = req.body.room_id;
    const veterinarian_dni = req.body.veterinarian_dni;

    await createAppointment(appointment_date, start_hour, observations, pet_id, room_id, veterinarian_dni);
    res.status(201).json({
        code: 201,
        title: "created",
        message: "The appointment has been created.",
    });
};

/**
 * Función para modificar una cita existente.
 * Se encarga de manejar la solicitud PUT /vettion/appointments/:id_appointment.
 * @param {*} req Objeto de solicitud.
 * @param {*} res Objeto de respuesta.
 * @returns Devuelve un JSON estandarizado con el código de estado 204 y un mensaje de confirmación
 * o el código de estado 404 si no se encuentra.
 */
const putAppointment = async (req, res) => {
    const id_appointment = req.params.id_appointment;

    if (!(await appointmentExistsById(id_appointment))) {
        return res.status(404).json({
            code: 404,
            title: "not found",
            message: "The appointment does not exist.",
        });
    }

    const appointment_date = req.body.appointment_date;
    const start_hour = req.body.start_hour;
    const observations = req.body.observations;
    const pet_id = req.body.pet_id;
    const room_id = req.body.room_id;
    const veterinarian_dni = req.body.veterinarian_dni;

    await modifyAppointment(id_appointment, appointment_date, start_hour, observations, pet_id, room_id, veterinarian_dni);
    res.status(204).end();
};

/**
 * Función para eliminar una cita existente.
 * Se encarga de manejar la solicitud DELETE /vettion/appointments/:id_appointment.
 * @param {*} req Objeto de solicitud.
 * @param {*} res Objeto de respuesta.
 * @returns Devuelve un JSON estandarizado con el código de estado 204 y un mensaje de confirmación
 * o el código de estado 404 si no se encuentra.
 */
const deleteAppointment = async (req, res) => {
    const id_appointment = req.params.id_appointment;

    if (!(await appointmentExistsById(id_appointment))) {
        return res.status(404).json({
            code: 404,
            title: "not found",
            message: "The appointment does not exist.",
        });
    }

    await removeAppointment(id_appointment);
    res.status(204).end();
}

module.exports = {
    getAppointments,
    getAppointment,
    postAppointment,
    putAppointment,
    deleteAppointment
};
