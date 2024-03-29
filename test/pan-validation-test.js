/**
 * @file pan-validation-test.js
 * Unit tests for pan-validation.js
 */

var assert = chai.assert;



describe('PAN Validation', function() {

  describe('isMod10', function() {
    var validInputs = ['79927398713','49927398716' ];
    var invalidInputs = ['7992739872', '49927398717'];

    it('returns false if the pan has length zero', function() {
      assert.isFalse(isMod10(''), "Failed on empty string");
    });

    it('returns true if the pan passes the mod 10 check', function() {
      validInputs.forEach(function(input) {
        assert.isTrue(isMod10(input), "Failed Input: " + input);
      });
    });

    it('returns false if the pan does not pass the mod 10 check', function() {
      invalidInputs.forEach(function(input) {
        assert.isFalse(isMod10(input), "Failed Input: " + input);
      });
    });
  });

  describe('panShort', function() {
    var invalidInputs = ['1', '12', '123', '1234567890', '12345678901', '123456789012'];
    var validInputs = ['1234567890123', '12345678901234', '123456789012345'];

    it('returns true for inputs of length < 13', function() {
      invalidInputs.forEach(function(input) {
        assert.isTrue(panShort(input), "Failed Input: " + input);
      });
    });

    it('returns false otherwise', function() {
      validInputs.forEach(function(input) {
        assert.isFalse(panShort(input), "Failed Input: " + input);
      });
    });

  });

  describe('panLong', function() {
    var invalidInputs = ['12345678901234567890', '123456789012345678901', '1234567890123456789012'];
    var validInputs = ['1234567890123', '12345678901234', '123456789012345'];

    it('returns true for inputs of length > 19', function() {
      invalidInputs.forEach(function(input) {
        assert.isTrue(panLong(input), "Failed Input: " + input);
      });
    });

    it('returns false otherwise', function() {
      validInputs.forEach(function(input) {
        assert.isFalse(panLong(input), "Failed Input: " + input);
      });
    });

  });

  describe('panNotNumeric', function() {

    var badInputs = ['123456789012a', 'a', '123456789$', '!@#$%^^&$#adfsjkd'];
    var goodInputs = ['123456789','1','12345678901234567890'];

    it('returns true if the pan contains non-numeric characters', function() {
      badInputs.forEach(function(input) {
        assert.isTrue(panNotNumeric(input), "Failed Input: " + input);
      });
    });

    it('returns false if the pan only contain numeric characters', function() {
      goodInputs.forEach(function(input) {
        assert.isFalse(panNotNumeric(input), "Failed Input: " + input);
      });
    });

  });
});
