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
    const birthDate = new Date(date);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        years -= 1;
    }

    return years;
}

function isAtLeastAge(date, minimumAge = 18) {
    return getYearsFromNow(date) >= minimumAge;
}

module.exports = { formatDate, getYearsFromNow, isAtLeastAge };