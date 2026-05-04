// En este archivo se implementa un filtro para evitar que se pueda generar una cita en fin de semana.

/**
 * Comprueba si una fecha es fin de semana.
 * @param {string} date_appointment - Fecha en formato string.
 * @returns {boolean} - true si es fin de semana, false si no lo es.
 */
const isWeekend = (date_appointment) => {
    const date = new Date(date_appointment);
    const day = date.getDay();

    return day === 0 || day === 6;
};

module.exports = { isWeekend };