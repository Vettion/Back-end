const { response } = require("express");
const { findAllAppointments, findAppointmentById, findAllCleanServices, findCleanServiceById, createAppointment, modifyAppointment,
    modifyCleanService, removeAppointment, removeCleanService } = require("../service/appointmentService");
const { title } = require("node:process");

/**
 * Función para obtener una lista de todas las citas.
 * Se encarga de manejar la solicitud GET /vettion/appointments.
 * @param {*} req Objeto de solicitud.
 * @param {*} res Objeto de respuesta.
 * @param {*} next Función middleware para manejar errores.
 * @returns Devuelve un JSON estandarizado con el código de estado 200 y un array de todas las citas.
 */
const getAllAppointments = async (req, res, next) => {
    try {
        const appointments = await findAllAppointments();
        return res.status(200).json({
            code: 200,
            title: "success",
            message: "Appointments retrieved successfully.",
            data: appointments
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Función para obtener una lista de todos los servicios de limpieza.
 * Se encarga de manejar la solicitud GET /vettion/clean_services.
 * @param {*} req Objeto de solicitud.
 * @param {*} res Objeto de respuesta.
 * @param {*} next Función middleware para manejar errores.
 * @returns Devuelve un JSON estandarizado con el código de estado 200 y un array de todos los servicios de limpieza.
 */
const getAllCleanServices = async (req, res, next) => {
    try {
        const cleanServices = await findAllCleanServices();
        return res.status(200).json(cleanServices);
    } catch (error) {
        next(error);
    }
};

/**
 * Función para obtener una cita específica por su id.
 * Se encarga de manejar la solicitud GET /vettion/appointments/:id_appointment.
 * @param {*} req Objeto de solicitud.
 * @param {*} res Objeto de respuesta.
 * @param {*} next Función middleware para manejar errores.
 * @returns Devuelve un JSON estandarizado con el código de estado 200 y los datos de la cita solicitada
 * o el código de estado 404 si no se encuentra.
 */
const getAppointmentById = async (req, res, next) => {
    try {
        const { id_appointment } = req.params;
        const appointment = await findAppointmentById(id_appointment);

        if (!appointment) {
            return res.status(404).json({
                code: 404,
                title: "not found",
                message: `Appointment with id ${id_appointment} not found`,
            });
        }
        return res.status(200).json({
            code: 200,
            title: "success",
            message: "Appointment retrieved successfully.",
            data: appointment
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Función para obtener un servicio de limpieza específico por su id.
 * Se encarga de manejar la solicitud GET /vettion/clean_services/:id_clean_service.
 * @param {*} req Objeto de solicitud.
 * @param {*} res Objeto de respuesta.
 * @param {*} next Función middleware para manejar errores.
 * @returns Devuelve un JSON estandarizado con el código de estado 200 y los datos del servicio de limpieza solicitado
 * o el código de estado 404 si no se encuentra.
 */
const getCleanServiceById = async (req, res, next) => {
    try {
        const { id_clean_service } = req.params;
        const cleanService = await findCleanServiceById(id_clean_service);

        if (!cleanService) {
            return res.status(404).json({
                code: 404,
                title: "not found",
                message: `Clean service with id ${id_clean_service} not found`,
            });
        }

        res.status(200).json({
            code: 200,
            title: "success",
            message: "Clean service retrieved successfully.",
            data: cleanService
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Función para crear una nueva cita.
 * Se encarga de manejar la solicitud POST /vettion/appointments.
 * @param {*} req Objeto de solicitud.
 * @param {*} res Objeto de respuesta.
 * @param {*} next Función middleware para manejar errores.
 * @returns Devuelve un JSON estandarizado con el código de estado 201 y un mensaje de confirmación.
 */
const postAppointment = async (req, res, next) => {
    try {
        const id_appointment = await createAppointment(req.body);
        const newAppointment = await findAppointmentById(id_appointment);

        res.status(201).json({
            code: 201,
            title: "created",
            message: "Appointment created successfully.",
            data: newAppointment
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Función para modificar una cita existente.
 * Se encarga de manejar la solicitud PUT /vettion/appointments/:id_appointment.
 * @param {*} req Objeto de solicitud.
 * @param {*} res Objeto de respuesta.
 * @param {*} next Función middleware para manejar errores.
 * @returns Devuelve un JSON estandarizado con el código de estado 204 y un mensaje de confirmación
 * o el código de estado 404 si no se encuentra.
 */
const putAppointment = async (req, res, next) => {
    try {
        const { id_appointment } = req.params;
        const appointmentData = req.body;

        await modifyAppointment(id_appointment, appointmentData);

        const updatedAppointment = await findAppointmentById(id_appointment);

        if (!updatedAppointment) {
            return res.status(404).json({
                code: 404,
                title: "not found",
                message: `Appointment with id ${id_appointment} not found aftrer update.`,
            });
        }
        res.status(200).json({
            code: 200,
            title: "success",
            message: "Appointment updated successfully.",
            data: updatedAppointment
        });

    } catch (error) {
        next(error);
    }
};

/**
 * Función para modificar el atributo observations de un servicio de limpieza existente.
 * Se encarga de manejar la solicitud PUT /vettion/clean_services/:id_clean_service.
 * @param {*} req Objeto de solicitud.
 * @param {*} res Objeto de respuesta.
 * @param {*} next Función middleware para manejar errores.
 * @returns Devuelve un JSON estandarizado con el código de estado 204 y un mensaje de confirmación
 * o el código de estado 404 si no se encuentra.
 */
const putCleanService = async (req, res, next) => {
    try {
        const { id_clean_service } = req.params;
        const cleanServiceData = req.body;

        await modifyCleanService(id_clean_service, cleanServiceData);

        const updatedCleanService = await findCleanServiceById(id_clean_service);

        if (!updatedCleanService) {
            return res.status(404).json({
                code: 404,
                title: "not found",
                message: `Clean service with id ${id_clean_service} not found after update.`,
            });
        }
        res.status(200).json({
            code: 200,
            title: "success",
            message: "Clean service updated successfully.",
            data: updatedCleanService
        });

    } catch (error) {
        next(error);
    }
};

/**
 * Función para eliminar una cita existente.
 * Se encarga de manejar la solicitud DELETE /vettion/appointments/:id_appointment.
 * @param {*} req Objeto de solicitud.
 * @param {*} res Objeto de respuesta.
 * @param {*} next Función middleware para manejar errores.
 * @returns Devuelve un JSON estandarizado con el código de estado 204 y un mensaje de confirmación
 * o el código de estado 404 si no se encuentra.
 */
const deleteAppointment = async (req, res, next) => {
    try {
        const { id_appointment } = req.params;

        const deleteCountCleanService = await removeCleanService(id_appointment);
        
        if (deleteCountCleanService === 0) {
            return res.status(404).json({
                code: 404,
                title: "not found",
                message: `Clean service with appointment id ${id_appointment} not found.`,
            });
        }
        const deleteCountAppointment = await removeAppointment(id_appointment);

        if (deleteCountAppointment === 0) {
            return res.status(404).json({
                code: 404,
                title: "not found",
                message: `Appointment with id ${id_appointment} not found.`,
            });
        }

        res.status(200).json({
            code: 200,
            title: "success",
            message: `Appointment with id ${id_appointment} and its associated clean service deleted successfully.`,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllAppointments,
    getAllCleanServices,
    getAppointmentById,
    getCleanServiceById,
    postAppointment,
    putAppointment,
    putCleanService,
    deleteAppointment,
};
