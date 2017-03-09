describe('Formatting Pan', function() {
  describe('formatPan', function() {
    var formatPanTests = {
      //visa
      "466": {result: "466"},
      "466665": {result: "4666 65"},
      "4666 6554": {result: "4666 6554 "},
      "4666655412342356": {result: "4666 6554 1234 2356"},
      //amex
      "346": {result: "346"},
      "346665": {result: "3466 65"},
      "3466 655456": {result: "3466 655456 "},
      "346665541234235": {result: "3466 655412 34235"},
      //mastercard
      "516": {result: "516"},
      "516665": {result: "5166 65"},
      "5166 6554": {result: "5166 6554 "},
      "5166655412342356": {result: "5166 6554 1234 2356"},
      //discover
      "606": {result: "606"},
      "606665": {result: "6066 65"},
      "6066 6554": {result: "6066 6554 "},
      "6066655412342356": {result: "6066 6554 1234 2356"},
    };

    Object.keys(formatPanTests).forEach(function(pan) {
      it("given " +pan + " should return "+ formatPanTests[pan].result, 
        function() {
          formatPan(pan).should.equal(formatPanTests[pan].result);
        }
      );
    });
  });  
});
