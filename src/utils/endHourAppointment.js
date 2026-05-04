const endHourAppointment = (start_time, consultDuration) => {
  //Convertimos a minutos la hora de inicio y sumamos la duración de la consulta.
  //Añadimos 20 extra para la finalización de la limpieza de la sala.
  const [hours, minutes] = start_time.split(":").map(Number);
  let totalMinutes = hours * 60 + minutes + consultDuration;

  //Convertimos el total de minutos de nuevo a formato HH:MM
  const endHours = Math.floor(totalMinutes / 60) % 24;
  const endMinutes = totalMinutes % 60;
  const end_hour_consult = [endHours, endMinutes]
    .map((unit) => String(unit).padStart(2, "0"))
    .join(":");

    return end_hour_consult;
};

module.exports = { endHourAppointment };
