/**
 * Devuelve la fecha formateada en formato local español a partir de una fecha.
 * @param {Date|string|number} date - Fecha a formatear.
 * @returns {string} Fecha en formato 'dd/mm/aaaa'.
 */
function formatDate(date) {
    return new Date(date).toLocaleDateString('es-ES');
};

/**
 * Calcula el número absoluto de días entre dos fechas.
 * @param {Date|string|number} fromDate - Fecha inicial.
 * @param {Date|string|number} toDate - Fecha final.
 * @returns {number} Número de días (valor absoluto).
 */
function getDays(fromDate, toDate) {
    const start = new Date(fromDate);
    const end = new Date(toDate);
    const days = start.getTime() - end.getTime();
    return Math.abs(Math.round(days / (1000 * 3600 * 24)));
}

/**
 * Calcula la edad en años completos transcurridos desde la fecha dada hasta hoy.
 * @param {Date|string|number} date - Fecha de nacimiento o referencia.
 * @returns {number} Edad en años completos.
 */
function getYearsFromNow(date) {
    const birthDate = new Date(date);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        years -= 1;
    }

    return years;
}

/**
 * Comprueba si la edad calculada a partir de la fecha es al menos la edad mínima.
 * @param {Date|string|number} date - Fecha de nacimiento.
 * @param {number} [minimumAge=18] - Edad mínima requerida.
 * @returns {boolean} `true` si la edad es mayor o igual que `minimumAge`.
 */
function isAtLeastAge(date, minimumAge = 18) {
    return getYearsFromNow(date) >= minimumAge;
}

module.exports = { formatDate, getYearsFromNow, isAtLeastAge };