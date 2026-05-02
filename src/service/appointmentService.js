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

  const { date_appointment, start_time, consult_room, observations, pet_id, consult_id, veterinarian_dni, cleaner_dni } = appointmentData;

  // Obtener la duración de la consulta.
  const consultDuration = await db("consult")
    .select("duration")
    .where({ id_consult: consult_id })
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
    date_appointment,
    start_time,
    end_time: end_hour_consult,
    consult_room,
    observations,
    pet_id,
    consult_id,
    veterinarian_dni,
  });

  //Asignación del personal de limpieza a la sala después de cada cita.
  await db("clean_service").insert({
    date_service: date_appointment,
    start_time: end_hour_consult,
    end_time: end_hour_with_cleaning,
    cleaner_dni,
    appointment_id: appointmentId,
  });

  return appointmentId;
};

/**
 * Funcion para modificar una cita existente.
 * @param {*} id_appointment
 * @param {*} appointmentData
 * @returns
 */
const modifyAppointment = async (id_appointment, appointmentData) => {

  const { date_appointment, start_time, consult_room, observations, pet_id, consult_id, veterinarian_dni } = appointmentData;
  //Comprobamos que lo que si se ha cambiado es la hora de inicio entonces repetimos el mismo proceso que en la creación de la
  //cita para actualizar también la hora de fin de la cita y del servicio de limpieza.
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
      date_appointment,
      start_time,
      end_time: end_hour_consult,
      consult_room,
      observations,
      pet_id,
      consult_id,
      veterinarian_dni,
    });

    await db("clean_service")
      .where({ appointment_id: id_appointment })
      .update({
        start_time: end_hour_consult,
        end_time: end_hour_with_cleaning,
      });
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

module.exports = {
  findAllAppointments,
  findAppointmentById,
  findAllCleanServices,
  findCleanServiceById,
  createAppointment,
  modifyAppointment,
  modifyCleanService,
  removeAppointment,
  removeCleanService
};
