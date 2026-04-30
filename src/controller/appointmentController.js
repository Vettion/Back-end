const { response } = require("express");
const { findAllAppointments, findAppointment, findAllCleanServices, findCleanService, createAppointment, modifyAppointment, modifyCleanService, removeAppointment, removeCleanService, appointmentExistsById, cleanServiceExistsById } = require("../service/appointmentService");
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
 * Función para obtener una lista de todos los servicios de limpieza.
 * Se encarga de manejar la solicitud GET /vettion/clean_services.
 * @param {*} req Objeto de solicitud.
 * @param {*} res Objeto de respuesta.
 * @returns Devuelve un JSON estandarizado con el código de estado 200 y un array de todos los servicios de limpieza.
 */
const getCleanServices = async (req, res) => {
    const cleanServices = await findAllCleanServices();
    return res.status(200).json(cleanServices);
};

/**
 * Función para obtener un servicio de limpieza específico por su id.
 * Se encarga de manejar la solicitud GET /vettion/clean_services/:id_clean_service.
 * @param {*} req Objeto de solicitud.
 * @param {*} res Objeto de respuesta.
 * @returns Devuelve un JSON estandarizado con el código de estado 200 y los datos del servicio de limpieza solicitado
 * o el código de estado 404 si no se encuentra.
 */
const getCleanService = async (req, res) => {
    const id_clean_service = req.params.id_clean_service;

    if (!(await cleanServiceExistsById(id_clean_service))) {
        return res.status(404).json({
            code: 404,
            title: "not found",
            message: "The clean service has not been found",
        });
    }

    const cleanService = await findCleanService(id_clean_service);
    res.status(200).json(cleanService);
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

const putCleanService = async (req, res) => {
    const id_clean_service = req.params.id_clean_service;
    if (!(await cleanServiceExistsById(id_clean_service))) {
        return res.status(404).json({
            code: 404,
            title: "not found",
            message: "The clean service does not exist.",
        });
    }
    const observations = req.body.observations;
    await modifyCleanService(id_clean_service, observations);
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
    await removeCleanService(id_appointment);
    res.status(204).end();
}

module.exports = {
    getAppointments,
    getAppointment,
    getCleanServices,
    getCleanService,
    postAppointment,
    putAppointment,
    putCleanService,
    deleteAppointment
};
