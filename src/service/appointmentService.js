const { isWeekend } = require("../utils/isWeekend.js");
const { endHourAppointment } = require("../utils/endHourAppointment.js");
const { start } = require("node:repl");
const db = require("../configuration/database.js").db;

/**
 * Funcion para obtener todas las citas de la base de datos.
 * @returns
 */
const findAllAppointments = async () => {
  return await db("appointment").select("*");
};

/**
 * Funcion para obtener una cita específica por su ID.
 * @param {*} id_appointment
 * @returns
 */
const findAppointmentById = async (id_appointment) => {
  return await db("appointment")
    .select("*")
    .where({ id_appointment: id_appointment })
    .first();
};

/**
 * Función para obtener las citas por el id de la mascota
 * @param {*} pet_id
 * @returns
 */
const findAppointmentByPetId = async (pet_id) => {
  return await db("appointment").select("*").where({ pet_id: pet_id });
};

/**
 * Funcion para obtener todos los servicios de limpieza de la base de datos.
 * @returns
 */
const findAllCleanServices = async () => {
  return await db("clean_service").select("*");
};

/**
 * Funcion para obtener un servicio de limpieza específico por su ID.
 * @param {*} id_clean_service
 * @returns
 */
const findCleanServiceById = async (id_clean_service) => {
  return await db("clean_service")
    .select("*")
    .where({ id_clean_service: id_clean_service })
    .first();
};

/**
 * Funcion para crear una nueva cita.
 * @param {*} appointmentData
 * @returns
 */
const createAppointment = async (appointmentData) => {
  const {
    date_appointment,
    start_time,
    consult_room,
    observations,
    pet_id,
    consult_id,
    veterinarian_dni,
    cleaner_dni,
  } = appointmentData;

  // Añadimos la funcion creada en (../utils/isWeekend.js) para evitar que se pueda generar una cita en fin de semana.
  if (isWeekend(date_appointment)) {
    throw new Error(
      "La clínica está cerrada los fines de semana, por favor elija otra fecha.",
    );
  }

  // Obtener la duración de la consulta.
  const consultDuration = await db("consult")
    .select("duration")
    .where({ id_consult: consult_id })
    .first();

  if (!consultDuration) {
    throw new Error("Consult duration not found for the specified consult.");
  } else {
    //Llamamos a la función creada en (../utils/endHourAppointment.js) para calcular cuando finaliza la cita y cuando
    //inicia y termina el servicio de limpieza de la sala.
    const end_hour_appointment = endHourAppointment(
      start_time,
      consultDuration.duration,
    );

    const [appointmentId] = await db("appointment").insert({
      date_appointment,
      start_time,
      end_time: end_hour_appointment,
      consult_room,
      observations,
      pet_id,
      consult_id,
      veterinarian_dni,
    });

    const end_hour_clean_service = endHourAppointment(end_hour_appointment, 20);

    await db("clean_service").insert({
      date_service: date_appointment,
      start_time: end_hour_appointment,
      end_time: end_hour_clean_service,
      cleaner_dni,
      appointment_id: appointmentId,
    });

    return appointmentId;
  }
};

/**
 * Funcion para modificar una cita existente.
 * @param {*} id_appointment
 * @param {*} appointmentData
 * @returns
 */
const modifyAppointment = async (id_appointment, appointmentData) => {
  const {
    date_appointment,
    start_time,
    consult_room,
    observations,
    pet_id,
    consult_id,
    veterinarian_dni,
  } = appointmentData;

  // Añadimos la funcion creada en (../utils/isWeekend.js) para evitar que se pueda modificar una cita en fin de semana.
  if (isWeekend(date_appointment)) {
    throw new Error(
      "La clínica está cerrada los fines de semana, por favor elija otra fecha.",
    );
  }

  //Comprobamos que lo que si se ha cambiado es la hora de inicio entonces llamamos a la función endHourAppointment
  const previousStartHour = await db("appointment")
    .select("start_time")
    .where({ id_appointment: id_appointment })
    .first();

  //Si se ha modificado al atributo start_hour
  if (previousStartHour.start_time !== start_time) {
    // Obtener la duración del servicio asociado a la sala para calcular la hora de fin de la cita
    const consultDuration = await db("consult")
      .select("duration")
      .where({ id_consult: consult_id })
      .first();

    if (!consultDuration) {
      throw new Error("Consult duration not found for the specified room.");
    } else {
      const end_hour_appointment = endHourAppointment(
        start_time,
        consultDuration.duration,
      );
      const end_hour_with_cleaning = endHourAppointment(
        end_hour_appointment,
        20,
      );

      await db("appointment").where({ id_appointment: id_appointment }).update({
        date_appointment,
        start_time,
        end_time: end_hour_appointment,
        consult_room,
        observations,
        pet_id,
        consult_id,
        veterinarian_dni,
      });

      await db("clean_service")
        .where({ appointment_id: id_appointment })
        .update({
          start_time: end_hour_appointment,
          end_time: end_hour_with_cleaning,
        });
    }
  } else {
    await db("appointment").where({ id_appointment: id_appointment }).update({
      date_appointment,
      start_time,
      consult_room,
      observations,
      pet_id,
      consult_id,
      veterinarian_dni,
    });
  }

  return id_appointment;
};

/**
 * Función para modificar los atributos cleaner_dni y observations de un servicio de limpieza existente.
 * @param {*} id_clean_service
 * @param {*} cleanServiceData
 * @returns
 */
const modifyCleanService = async (id_clean_service, cleanServiceData) => {
  const { cleaner_dni, observations } = cleanServiceData;
  return await db("clean_service")
    .where({ id_clean_service: id_clean_service })
    .update({ cleaner_dni, observations });
};

/**
 * Funcion para eliminar una cita existente.
 * @param {*} id_appointment
 * @returns
 */
const removeAppointment = async (id_appointment) => {
  return await db("appointment")
    .where({ id_appointment: id_appointment })
    .del();
};

/**
 * Función para eliminar un servicio de limpieza asociado a una cita existente.
 * @param {} id_appointment
 * @returns
 */
const removeCleanService = async (id_appointment) => {
  return await db("clean_service")
    .where({ appointment_id: id_appointment })
    .del();
};

const findAppointmentsByRoomAndDate = async (code_room, date) => {
  return await db("appointment as a")
    .select(
      "a.id_appointment",
      "a.date_appointment",
      "a.start_time",
      "a.end_time",
      "a.pet_id",
      "a.code_room",
      "p.name_pet",
      "o.name_owner",
      "o.surname as owner_surname",
    )
    .leftJoin("pet as p", "a.pet_id", "p.id_pet")
    .leftJoin("owner as o", "p.owner_dni", "o.dni_owner")
    .where({ "a.code_room": code_room, "a.date_appointment": date })
    .orderBy("a.start_time", "asc");
};

const findCleanServicesByAppointmentIds = async (appointmentIds) => {
  if (!Array.isArray(appointmentIds) || appointmentIds.length === 0) return [];
  return await db("clean_service as cs")
    .select(
      "cs.id_clean_service",
      "cs.date_service",
      "cs.start_time",
      "cs.end_time",
      "cs.appointment_id",
    )
    .whereIn("cs.appointment_id", appointmentIds)
    .orderBy("cs.start_time", "asc");
};
module.exports = {
  findAllAppointments,
  findAppointmentById,
  findAppointmentByPetId,
  findAllCleanServices,
  findCleanServiceById,
  createAppointment,
  modifyAppointment,
  modifyCleanService,
  removeAppointment,
  removeCleanService,
  findAppointmentsByRoomAndDate,
  findCleanServicesByAppointmentIds,
};
