const { isWeekend } = require("../utils/isWeekend.js");
const { endHourAppointment } = require("../utils/endHourAppointment.js");
const { formatDate } = require("../utils/dateUtil.js");
const { start } = require("node:repl");
const db = require("../configuration/database.js").db;

/**
 * Funcion para obtener todas las citas de la base de datos.
 * @returns
 */
const findAllAppointments = async () => {
  const appointment = await db("appointment").select("*");
  return appointment.map(a => ({ ...a, date_appointment: formatDate(a.date_appointment) }));
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
  const appointments = await db("appointment").select("*").where({ pet_id: pet_id });
  return appointments.map(a => ({ ...a, date_appointment: formatDate(a.date_appointment) }));
};

/**
 * Función para obtener las citas por el id de la sala
 * @param {*} code_room 
 * @returns 
 */
const findAppointmentByRoomId = async (code_room) => {
  return await db("appointment").select("*").where({ code_room: code_room });
}

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
    observations,
    pet_id,
    service_id,
    veterinarian_dni,
    cleaner_dni,
    code_room
  } = appointmentData;

  // Añadimos la funcion creada en (../utils/isWeekend.js) para evitar que se pueda generar una cita en fin de semana.
  if (isWeekend(date_appointment)) {
    throw new Error(
      "The clinic is closed on weekends, please choose another date.",
    );
  }

  //Comprobamos que la fecha no es de una fecha que ya ha pasado
  const dateAppointment = new Date(date_appointment);
  const today = new Date();
  if (dateAppointment.getDay() < today.getDay()) {
    throw new Error(
      "You cannot select a date in the past."
    )
  }

  //Comprobamos que el servicio que se va a hacer es el mismo que la especialidad del veterinario.
  const veterinarianService = await db("veterinarian").select("speciality").where({ dni_veterinarian: veterinarian_dni }).first();
  const serviceType = await db("service").select("service_type").where({ id_service: service_id }).first();


  const serviceT = serviceType.service_type.trim().toLowerCase();
  const specialityVet = veterinarianService.speciality.trim().toLowerCase();
  
  if (!veterinarianService || !serviceType || serviceT !== specialityVet) {
    throw new Error("This veterinarian cannot be assigned to this type of service.")
  }

  // Obtener la duración de la consulta.
  const serviceDuration = await db("service")
    .select("duration")
    .where({ id_service: service_id })
    .first();

  if (!serviceDuration) {
    throw new Error("Consult duration not found for the specified consult.");
  } else {
    //Llamamos a la función creada en (../utils/endHourAppointment.js) para calcular cuando finaliza la cita y cuando
    //inicia y termina el servicio de limpieza de la sala.
    const end_hour_appointment = endHourAppointment(
      start_time,
      serviceDuration.duration,
    );

    //Comprobamos que la sala no está ocupada en ese intervalo de tiempo.
    const overlappingAppointments = await db("appointment")
      .where({ code_room: code_room })
      .andWhere(function () {
        this.where("start_time", "<", end_hour_appointment)
          .andWhere("end_time", ">", start_time);
      });

    if (overlappingAppointments.length > 0) {
      throw new Error("The room is occupied at that time.")
    }
    else {
      const [appointmentId] = await db("appointment").insert({
        date_appointment,
        start_time,
        end_time: end_hour_appointment,
        observations,
        pet_id,
        service_id,
        veterinarian_dni,
        code_room
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
    observations
  } = appointmentData;

  // Añadimos la funcion creada en (../utils/isWeekend.js) para evitar que se pueda modificar una cita en fin de semana.
  if (isWeekend(date_appointment)) {
    throw new Error(
      "The clinic is closed on weekends, please choose another date.",
    );
  }

  const dateAppointment = new Date(date_appointment);
  const today = new Date();
  if (dateAppointment.getTime() < today.getTime()) {
    throw new Error(
      "You cannot select a date in the past."
    )
  }

  //Comprobamos que lo que si se ha cambiado es la hora de inicio entonces llamamos a la función endHourAppointment
  const previousStartHour = await db("appointment")
    .select("start_time", "code_room")
    .where({ id_appointment: id_appointment })
    .first();

  const code_room = previousStartHour.code_room;

  //Si se ha modificado al atributo start_hour
  if (previousStartHour.start_time !== start_time) {
    // Obtener la duración del servicio asociado a la sala para calcular la hora de fin de la cita
    const service_id = await db("appointment").select("service_id").where({id_appointment: id_appointment}).first();
    const consultDuration = await db("service")
      .select("duration")
      .where({ id_service: service_id.service_id })
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

      const previousAppointmentDate = await db("appointment").select("date_appointment").where({ id_appointment: id_appointment }).first();

      if (previousAppointmentDate.date_appointment !== date_appointment) {
        //Comprobamos que la sala no está ocupada en ese intervalo de tiempo.
        const overlappingAppointments = await db("appointment")
          .where({ code_room: code_room, date_appointment: date_appointment })
          .andWhere(function () {
            this.where("start_time", "<", end_hour_appointment)
              .andWhere("end_time", ">", start_time);
          });

        if (overlappingAppointments.length > 0) {
          throw new Error("The room is occupied at that time.")
        }
      }
      else {
        //Comprobamos que la sala no está ocupada en ese intervalo de tiempo.
        const overlappingAppointments = await db("appointment")
          .where({ code_room: code_room })
          .andWhere(function () {
            this.where("start_time", "<", end_hour_appointment)
              .andWhere("end_time", ">", start_time);
          });

        if (overlappingAppointments.length > 0) {
          throw new Error("The room is occupied at that time.")
        }
      }

      await db("appointment").where({ id_appointment: id_appointment }).update({
        date_appointment,
        start_time,
        end_time: end_hour_appointment,
        observations
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
      observations
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
      "a.observations",
      "p.name_pet",
      "o.name_owner",
      "o.surname as owner_surname",
      "v.name as veterinarian_name",
      "v.surname as veterinarian_surname",
      "s.name as service_name",
      "r.name as room_name"
    )
    .leftJoin("pet as p", "a.pet_id", "p.id_pet")
    .leftJoin("owner as o", "p.owner_dni", "o.dni_owner")
    .leftJoin("veterinarian as v", "a.veterinarian_dni", "v.dni_veterinarian")
    .leftJoin("service as s", "a.service_id", "s.id_service")
    .leftJoin("room as r", "a.code_room", "r.room_code")
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
      "cs.observations"
    )
    .whereIn("cs.appointment_id", appointmentIds)
    .orderBy("cs.start_time", "asc");
};
module.exports = {
  findAllAppointments,
  findAppointmentById,
  findAppointmentByPetId,
  findAppointmentByRoomId,
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
