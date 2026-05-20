// En este archivo se implementa un filtro para evitar que se pueda generar una cita en fin de semana.

/**
 * Comprueba si una fecha es fin de semana.
 * @param {string} date_appointment - Fecha en formato string.
 * @returns {boolean} - true si es fin de semana, false si no lo es.
 */
const isWeekend = (date_appointment) => {
    const [year, month, day] = date_appointment.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    const dayOfWeek = date.getDay();

    return dayOfWeek === 0 || dayOfWeek === 6;
};

module.exports = { isWeekend };