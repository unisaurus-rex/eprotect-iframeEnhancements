/**
 * @file utils-test.js
 * test for js/utils.js
 */  

var expect = chai.expect;

describe('utils', function() {
  describe('Convert a month string with format "XX" to an int', function() {
    it('converts a string with a leading zero to a one digit value', function() {
      expect(monthStrToInt('01')).to.equal(1);
      expect(monthStrToInt('09')).to.equal(9);
    });

    it('converts a string with a leading 1 to a two digit value', function() {
      expect(monthStrToInt('10')).to.equal(10);
      expect(monthStrToInt('11')).to.equal(11);
      expect(monthStrToInt('12')).to.equal(12);
    });

  });
});
