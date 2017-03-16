var expect = chai.expect;


var today = new Date();
var currentMonth = today.getMonth() + 1; //month starts index at zero
var currentYear = today.getFullYear();
var futureYear = currentYear + 1;

var pastMonth = today.getMonth();
var pastYear = today.getFullYear() -1;

describe('Expiration Date Validation', function() {  

  describe('monthNotValid', function() {
    describe('year is less than or equal to the current year', function() {
      it('returns false if input month >= current month', function() {
        expect(monthNotValid(currentMonth, currentYear)).to.be.false;
        expect(monthNotValid(currentMonth, pastYear)).to.be.false;
      });

      it('returns true if input month < current month', function() {
        expect(monthNotValid(pastMonth, currentYear)).to.be.true;
        expect(monthNotValid(pastMonth, pastYear)).to.be.true;
      });
    });

    describe('year is greater than the current year', function() {
      it('returns false for any input month', function() {
        expect(monthNotValid(currentMonth, futureYear)).to.be.false;
        expect(monthNotValid(pastMonth, futureYear)).to.be.false;
      });
    });
  });

  describe('yearNotValid', function() {
    it('returns false if input year >= current year', function() {
      expect(yearNotValid(currentYear)).to.be.false;
      expect(yearNotValid(futureYear)).to.be.false;
    });

    it('returns true if input year < current year', function() {
      expect(yearNotValid(pastYear)).to.be.true;
    });
  });

});
