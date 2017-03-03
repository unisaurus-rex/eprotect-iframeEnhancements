/**
 * @file pan-validation-test.js
 * Unit tests for pan-validation.js
 */



describe('PAN Validation', function() {
  describe('mod10', function() {
    // NOTE: assume the pan is all numeric?
    it('returns true if the pan passes the mod 10 check', function() {

    });

    it('returns false if the pan does not pass the mod 10 check', function() {

    });
  });

  describe('panShort', function() {
    it('returns true for inputs of length < 13', function() {

    });

    it('returns false otherwise', function() {

    });

  });

  describe('panLong', function() {
    it('returns true for inputs of length > 16', function() {

    });

    it('returns false otherwise', function() {

    });
  });

  describe('panNumeric', function() {
    it('returns false if the pan contains non-numeric characters', function() {

    });

    it('returns true if the pan only contain numeric characters', function() {

    });
  });
});
