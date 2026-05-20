const expect = require('chai').expect;
const { isWeekend } = require('../utils/isWeekend');

describe('isWeekend', () => {
    it('isWeekend', () => {
        expect(isWeekend('2026-05-23')).to.be.true;
        expect(isWeekend('2026-05-20')).to.be.false;
    });
});