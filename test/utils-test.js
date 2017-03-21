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

describe('stripSpaces', function() {
  var stripSpacesTests = {
    '1 2 3': "123",
    ' 23! ': "23!"
  };

  Object.keys(stripSpacesTests).forEach(function(test) {
    it('should return ' + test + ' as ' + stripSpacesTests[test], function() {
      stripSpaces(test).should.equal(stripSpacesTests[test]);
    });
  });
});

describe('errLookUp', function() {
  var errLookUpTests = {
    isMod10: "error-871",
    panShort: "error-872",
    panLong: "error-873",
    panNotNumeric: "error-874",
    cvcNotNumeric: "error-881",
    cvcShort: "error-882",
    cvcLong: "error-883"
  };

  Object.keys(errLookUpTests).forEach(function(test) {
    it('should return class ' + errLookUpTests[test] + ' given function ' + test, function() {
      errLookUp(test).should.equal(errLookUpTests[test]);
    });
  });
});