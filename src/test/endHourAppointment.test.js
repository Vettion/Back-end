const expect = require('chai').expect;
const { getDaysFromNow, getDays, getYearsFromNow, endHourAppointment } = require('../utils/endHourAppointment');

describe('endHourAppointment', () => {
    it('endHourAppointment', () => {
        let hour = '18:00';
        let serviceDuration = 20;
        expect(endHourAppointment(hour, serviceDuration)).equal('18:20');
    });
});

