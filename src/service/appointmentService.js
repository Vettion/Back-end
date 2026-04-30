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
  appointment_date,
  start_hour,
  observations,
  pet_id,
  room_id,
  veterinarian_dni,
) => {
  // Obtener la duración del servicio asociado a la sala para calcular la hora de fin de la cita
  const serviceDuration = await db("service")
    .select("service.duration_minutes")
    .join("room", "service.id_service", "room.service_id")
    .where("room.id_room", room_id)
    .first();

  console.log("Resultado de la consulta:", serviceDuration);
  if (!serviceDuration) {
    throw new Error("Service duration not found for the specified room.");
  }

  //Convertimos a minutos la hora de inicio y sumamos la duración del servicio.
  //Añadimos 20 extra para la finalización de la limpieza de la sala.
  const [hours, minutes] = start_hour.split(":").map(Number);
  let totalMinutes = hours * 60 + minutes + serviceDuration.duration_minutes;
  let totalMinutesWithCleaning = totalMinutes + 20; // Asumimos que el servicio de limpieza dura 20 minutos

  //Convertimos el total de minutos de nuevo a formato HH:MM
  const endHours = Math.floor(totalMinutes / 60) % 24;
  const endMinutes = totalMinutes % 60;
  const end_hour_consult = [endHours, endMinutes, 0]
    .map((unit) => String(unit).padStart(2, "0"))
    .join(":");

  const endHoursWithCleaning = Math.floor(totalMinutesWithCleaning / 60) % 24;
  const endMinutesWithCleaning = totalMinutesWithCleaning % 60;
  const end_hour_with_cleaning = [
    endHoursWithCleaning,
    endMinutesWithCleaning,
    0,
  ]
    .map((unit) => String(unit).padStart(2, "0"))
    .join(":");

  const [appointmentId] = await db("appointment").insert({
    appointment_date: appointment_date,
    start_hour: start_hour,
    end_hour: end_hour_consult,
    observations: observations,
    pet_id: pet_id,
    room_id: room_id,
    veterinarian_dni: veterinarian_dni,
  });

  //De momento solo es una prueba para comprobar que funciona la asignación del personal de limpieza a la sala.
  //TODO Falta implementar que busque el primero que esté libre en la lista de personal. Añadir ademas que no haya hecho 8 horas diarias??
  const cleanerDni = await db("cleaner").select("dni_cleaner").first();

  await db("clean_service").insert({
    clean_date: appointment_date,
    start_hour: end_hour_consult,
    end_hour: end_hour_with_cleaning,
    cleaner_dni: cleanerDni.dni_cleaner,
    appointment_id: appointmentId,
    room_id: room_id,
  });

  return { appointmentId, success: true };
};

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
const modifyAppointment = async (
  id_appointment,
  appointment_date,
  start_hour,
  observations,
  pet_id,
  room_id,
  veterinarian_dni,
) => {
  //Comprobamos que lo que si se ha cambiado es la hora de inicio entonces repetimos el mismo proceso que en la creación de la
  //cita para actualizar también la hora de fin de la cita y del servicio de limpieza.
  const previousStartHour = await db("appointment")
    .select("start_hour")
    .where({ id_appointment: id_appointment })
    .first();

  if (previousStartHour.start_hour !== start_hour) {
    // Obtener la duración del servicio asociado a la sala para calcular la hora de fin de la cita
    const serviceDuration = await db("service")
      .select("service.duration_minutes")
      .join("room", "service.id_service", "room.service_id")
      .where("room.id_room", room_id)
      .first();

    console.log("Resultado de la consulta:", serviceDuration);
    if (!serviceDuration) {
      throw new Error("Service duration not found for the specified room.");
    }

    //Convertimos a minutos la hora de inicio y sumamos la duración del servicio.
    //Añadimos 20 extra para la finalización de la limpieza de la sala.
    const [hours, minutes] = start_hour.split(":").map(Number);
    let totalMinutes = hours * 60 + minutes + serviceDuration.duration_minutes;
    let totalMinutesWithCleaning = totalMinutes + 20; // Asumimos que el servicio de limpieza dura 20 minutos

    //Convertimos el total de minutos de nuevo a formato HH:MM
    const endHours = Math.floor(totalMinutes / 60) % 24;
    const endMinutes = totalMinutes % 60;
    const end_hour_consult = [endHours, endMinutes, 0]
      .map((unit) => String(unit).padStart(2, "0"))
      .join(":");

    const endHoursWithCleaning = Math.floor(totalMinutesWithCleaning / 60) % 24;
    const endMinutesWithCleaning = totalMinutesWithCleaning % 60;
    const end_hour_with_cleaning = [
      endHoursWithCleaning,
      endMinutesWithCleaning,
      0,
    ]
      .map((unit) => String(unit).padStart(2, "0"))
      .join(":");

    await db("appointment")
      .where({ id_appointment: id_appointment })
      .update({
        appointment_date: appointment_date,
        start_hour: start_hour,
        end_hour: end_hour_consult,
        observations: observations,
        pet_id: pet_id,
        room_id: room_id,
        veterinarian_dni: veterinarian_dni,
      });

    //TODO Falta implementar que busque el primero que esté libre en la lista de personal. 
    //Añadir ademas que no haya hecho 8 horas diarias??
    const cleanerDni = await db("cleaner").select("dni_cleaner").first();

    await db("clean_service")
      .where({ appointment_id: id_appointment })
      .delete();

    await db("clean_service").insert({
      clean_date: appointment_date,
      start_hour: end_hour_consult,
      end_hour: end_hour_with_cleaning,
      cleaner_dni: cleanerDni.dni_cleaner,
      appointment_id: id_appointment,
      room_id: room_id,
    });
  } else {
    await db("appointment")
      .where({ id_appointment: id_appointment })
      .update({
        appointment_date: appointment_date,
        start_hour: start_hour,
        observations: observations,
        pet_id: pet_id,
        room_id: room_id,
        veterinarian_dni: veterinarian_dni,
      });
  }

  return { id_appointment: id_appointment, success: true };
};

const modifyCleanService = async (id_clean_service, observations) => {
  return await db("clean_service")
    .where({ id_clean_service: id_clean_service })
    .update({ observations: observations });
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
