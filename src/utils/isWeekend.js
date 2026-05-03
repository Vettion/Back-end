// En este archivo se implementa un filtro para evitar que se pueda generar una cita en fin de semana.

const isWeekend =(date_appointment) => {
    const date = new Date(date_appointment);
    const day = date.getDay();

    return day === 0 || day === 6;
};

module.exports = { isWeekend };