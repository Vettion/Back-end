const db = require("../configuration/database.js").db;
const e = require("cors");
const { homedir, platform } = require("os");
const { start } = require("repl");

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
const findAppointment = async (id_appointment) => {
  return await db("appointment")
    .select("*")
    .where({ id_appointment: id_appointment })
    .first();
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
const findCleanService = async (id_clean_service) => {
  return await db("clean_service")
    .select("*")
    .where({ id_clean_service: id_clean_service })
    .first();
};

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
const createAppointment = async (
  date_appointment,
  start_time,
  consult_room,
  observations,
  pet_id,
  consult_id,
  veterinarian_dni,
  cleaner_dni,
) => {
  // Obtener la duración de la consulta.
  const consultDuration = await db("consult")
    .select("duration")
    .where("id_consult", consult_id)
    .first();

  console.log("Resultado de la consulta:", consultDuration);
  if (!consultDuration) {
    throw new Error("Consult duration not found for the specified consult.");
  }

  //Convertimos a minutos la hora de inicio y sumamos la duración de la consulta.
  //Añadimos 20 extra para la finalización de la limpieza de la sala.
  const [hours, minutes] = start_time.split(":").map(Number);
  let totalMinutes = hours * 60 + minutes + consultDuration.duration;
  let totalMinutesWithCleaning = totalMinutes + 20; // Asumimos que el servicio de limpieza dura 20 minutos

  //Convertimos el total de minutos de nuevo a formato HH:MM
  const endHours = Math.floor(totalMinutes / 60) % 24;
  const endMinutes = totalMinutes % 60;
  const end_hour_consult = [endHours, endMinutes]
    .map((unit) => String(unit).padStart(2, "0"))
    .join(":");

  const endHoursWithCleaning = Math.floor(totalMinutesWithCleaning / 60) % 24;
  const endMinutesWithCleaning = totalMinutesWithCleaning % 60;
  const end_hour_with_cleaning = [endHoursWithCleaning, endMinutesWithCleaning]
    .map((unit) => String(unit).padStart(2, "0"))
    .join(":");

  const [appointmentId] = await db("appointment").insert({
    date_appointment: date_appointment,
    start_time: start_time,
    end_time: end_hour_consult,
    consult_room: consult_room,
    observations: observations,
    pet_id: pet_id,
    consult_id: consult_id,
    veterinarian_dni: veterinarian_dni,
  });

  //Asignación del personal de limpieza a la sala después de cada cita.
  await db("clean_service").insert({
    date_service: date_appointment,
    start_time: end_hour_consult,
    end_time: end_hour_with_cleaning,
    cleaner_dni: cleaner_dni,
    appointment_id: appointmentId,
  });

  //De momento solo es una prueba para comprobar que funciona la asignación del personal de limpieza a la sala.
  //TODO Falta implementar que busque el primero que esté libre en la lista de personal. Añadir ademas que no haya hecho 8 horas diarias??

  return { appointmentId, success: true };
};

/**
 * Funcion para modificar una cita existente.
 * @param {*} id_appointment
 * @param {*} date_appointment
 * @param {*} start_time
 * @param {*} consult_room
 * @param {*} observations
 * @param {*} pet_id
 * @param {*} consult_id
 * @param {*} veterinarian_dni
 * @returns
 */
const modifyAppointment = async (
  id_appointment,
  date_appointment,
  start_time,
  consult_room,
  observations,
  pet_id,
  consult_id,
  veterinarian_dni,
) => {
  //Comprobamos que lo que si se ha cambiado es la hora de inicio entonces repetimos el mismo proceso que en la creación de la
  //cita para actualizar también la hora de fin de la cita y del servicio de limpieza.
  const previousStartHour = await db("appointment")
    .select("start_time")
    .where({ id_appointment: id_appointment })
    .first();

  const previousCleanerDni = await db("clean_service")
    .select("cleaner_dni")
    .where({ appointment_id: id_appointment })
    .first();

  //Si se ha modificado al atributo start_hour
  if (previousStartHour.start_time !== start_time) {
    // Obtener la duración del servicio asociado a la sala para calcular la hora de fin de la cita
    const consultDuration = await db("consult")
      .select("duration")
      .where("id_consult", consult_id)
      .first();

    console.log("Resultado de la consulta:", consultDuration);
    if (!consultDuration) {
      throw new Error("Consult duration not found for the specified room.");
    }

    //Convertimos a minutos la hora de inicio y sumamos la duración del servicio.
    //Añadimos 20 extra para la finalización de la limpieza de la sala.
    const [hours, minutes] = start_time.split(":").map(Number);
    let totalMinutes = hours * 60 + minutes + consultDuration.duration;
    let totalMinutesWithCleaning = totalMinutes + 20; // Asumimos que el servicio de limpieza dura 20 minutos

    //Convertimos el total de minutos de nuevo a formato HH:MM
    const endHours = Math.floor(totalMinutes / 60) % 24;
    const endMinutes = totalMinutes % 60;
    const end_hour_consult = [endHours, endMinutes]
      .map((unit) => String(unit).padStart(2, "0"))
      .join(":");

    const endHoursWithCleaning = Math.floor(totalMinutesWithCleaning / 60) % 24;
    const endMinutesWithCleaning = totalMinutesWithCleaning % 60;
    const end_hour_with_cleaning = [
      endHoursWithCleaning,
      endMinutesWithCleaning,
    ]
      .map((unit) => String(unit).padStart(2, "0"))
      .join(":");

    await db("appointment").where({ id_appointment: id_appointment }).update({
      date_appointment: date_appointment,
      start_time: start_time,
      end_time: end_hour_consult,
      consult_room: consult_room,
      observations: observations,
      pet_id: pet_id,
      consult_id: consult_id,
      veterinarian_dni: veterinarian_dni,
    });

    await db("clean_service").update({
      start_time: end_hour_consult,
      end_time: end_hour_with_cleaning,
    });
  } else {
    await db("appointment").where({ id_appointment: id_appointment }).update({
      date_appointment: date_appointment,
      start_time: start_time,
      consult_room: consult_room,
      observations: observations,
      pet_id: pet_id,
      consult_id: consult_id,
      veterinarian_dni: veterinarian_dni,
    });
  }

  return { id_appointment: id_appointment, success: true };
};

/**
 * Función para modificar los atributos cleaner_dni y observations de un servicio de limpieza existente.
 * @param {*} id_clean_service 
 * @param {*} cleaner_dni 
 * @param {*} observations 
 * @returns 
 */
const modifyCleanService = async (
  id_clean_service,
  cleaner_dni,
  observations,
) => {
  return await db("clean_service")
    .where({ id_clean_service: id_clean_service })
    .update({ cleaner_dni: cleaner_dni, observations: observations });
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

const removeCleanService = async (id_appointment) => {
  return await db("clean_service")
    .where("appointment_id", id_appointment)
    .del();
};

/**
 * Funcion para verificar si una cita existe por su id.
 * @param {*} id_appointment
 * @returns
 */
const appointmentExistsById = async (id_appointment) => {
  const appointment = await db("appointment")
    .where("id_appointment", id_appointment)
    .first();
  return appointment != null;
};

/**
 * Funcion para verificar si un servicio de limpieza existe por su id.
 * @param {*} id_clean_service
 * @returns
 */
const cleanServiceExistsById = async (id_clean_service) => {
  const cleanService = await db("clean_service")
    .where("id_clean_service", id_clean_service)
    .first();
  return cleanService != null;
};

module.exports = {
  findAllAppointments,
  findAppointment,
  findAllCleanServices,
  findCleanService,
  createAppointment,
  modifyAppointment,
  modifyCleanService,
  removeAppointment,
  removeCleanService,
  appointmentExistsById,
  cleanServiceExistsById,
};
