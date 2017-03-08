/**
 * @file ineligible-chars-test.js
 */

var assert = chai.assert;

describe('Ineligible Characters Validation: ', function() {
  describe('ineligibeCharacter function', function() {
    var invalidInputs = ["a", "$", "F", "."];
    var validInputs = ["1", "2", "3", "0"];
    it('returns true if the character is not numeric', function() {
      invalidInputs.forEach(function(input) {
        assert.isTrue(isIneligible(input), "Failed Input: " + input);
      });
    });

    it('returns false if the character is numeric', function() {
      validInputs.forEach(function(input) {
        assert.isFalse(isIneligible(input), "Failed Input: " + input);
      });
    });
  });
});
