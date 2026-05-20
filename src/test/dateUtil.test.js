const expect = require('chai').expect;
const { format } = require('node:path');
const { formatDate, getDays, getYearsFromNow, isAtLeastAge } = require('../utils/dateUtil');

beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date('2026-02-03'));
});

afterAll(() => {
    jest.useRealTimers();
});

describe('dateUtil', () => {

    it('formatDate', () => {
        let newDate = formatDate(new Date('2024-02-03'));
        expect(newDate).equal('3/2/2024');

        newDate = formatDate(new Date('2026-12-03'));
        expect(newDate).equal('3/12/2026');
    })

    it('getDays', () => {
        let days = getDays(new Date('2025-01-12'), new Date('2025-01-15'));
        expect(days).equal(3);

        days = getDays(new Date('2025-01-01'), new Date('2024-01-01'));
        expect(days).equal(366);

        days = getDays(new Date('2024-01-01'), new Date('2024-01-01'));
        expect(days).equal(0);
    });

    it('getYearsFromNow', () => {
        let years = getYearsFromNow(new Date('2024-02-03'));
        expect(years).equal(2);

        years = getYearsFromNow(new Date('2016-02-03'));
        expect(years).equal(10);
    });

    it('isAtLeastAge', () => {
        let date = new Date('2000-11-12');
        expect(isAtLeastAge(date)).to.be.true;

        date = new Date('2024-01-01');
        expect(isAtLeastAge(date)).to.be.false;
    });
});