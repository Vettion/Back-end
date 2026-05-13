function formatDate(date) {
    return new Date(date).toLocaleDateString('es-ES');
};

function getDays(fromDate, toDate) {
    const start = new Date(fromDate);
    const end = new Date(toDate);
    const days = start.getTime() - end.getTime();
    return Math.abs(Math.round(days / (1000 * 3600 * 24)));
}

function getYearsFromNow(date) {
    const now = new Date();
    return Math.floor(getDays(date, now) / 365);
}

module.exports = { formatDate, getYearsFromNow };