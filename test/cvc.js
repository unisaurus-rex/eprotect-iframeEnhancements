var expect = chai.expect;

describe('detectCardType should', function() {
  var cards = {
    '8800000000000000': 'unionpay',

    '4026000000000000': 'electron',
    '4175000000000000': 'electron',
    '4405000000000000': 'electron',
    '4508000000000000': 'electron',
    '4844000000000000': 'electron',
    '4913000000000000': 'electron',
    '4917000000000000': 'electron',

    '5019000000000000': 'dankort',

    '5018000000000000': 'maestro',
    '5020000000000000': 'maestro',
    '5038000000000000': 'maestro',
    '5612000000000000': 'maestro',
    '5893000000000000': 'maestro',
    '6304000000000000': 'maestro',
    '6759000000000000': 'maestro',
    '6761000000000000': 'maestro',
    '6762000000000000': 'maestro',
    '6763000000000000': 'maestro',
    '0604000000000000': 'maestro',
    '6390000000000000': 'maestro',

    '3528000000000000': 'jcb',
    '3589000000000000': 'jcb',
    '3529000000000000': 'jcb',

    '6360000000000000': 'interpayment',

    '4916338506082832': 'visa',
    '4556015886206505': 'visa',
    '4539048040151731': 'visa',
    '4024007198964305': 'visa',
    '4716175187624512': 'visa',

    '5280934283171080': 'mastercard',
    '5456060454627409': 'mastercard',
    '5331113404316994': 'mastercard',
    '5259474113320034': 'mastercard',
    '5442179619690834': 'mastercard',

    '6011894492395579': 'discover',
    '6011388644154687': 'discover',
    '6011880085013612': 'discover',
    '6011652795433988': 'discover',
    '6011375973328347': 'discover',

    '345936346788903': 'amex',
    '377669501013152': 'amex',
    '373083634595479': 'amex',
    '370710819865268': 'amex',
    '371095063560404': 'amex'
  };

  Object.keys(cards).forEach(function(number) {
    it('should detect card ' + number + ' as ' + cards[number], function() {
      detectCardType(number).should.equal(cards[number]);
    });
  });
});



describe('getCvcLength should', function() {
  var types = {
    'unionpay': 4,
    'electron': 4,
    'dankort': 4,
    'maestro': 4,
    'jcb': 4,
    'interpayment': 4,
    'visa': 3,
    'mastercard': 3,
    'discover': 3,
    'amex': 4
  };

  Object.keys(types).forEach(function(type) {
    it('should detect cvc length ' + type + ' as ' + types[type], function() {
      getCvcLength(type).should.equal(types[type]);
    });
  });
});

describe('cvcNumericCheck should', function() {
  var cvcs = {
    '123': true,
    '23!': false,
    '@23': false,
    '1#3': false,
    'a23': false,
    '1b3': false,
    '12c': false,
    '1565': true,
    '+23': false,
    '12+': false
  };

  Object.keys(cvcs).forEach(function(cvc) {
    it('detect ' + cvc + ' as ' + cvcs[cvc], function() {
      cvcNumericCheck(cvc).should.equal(cvcs[cvc]);
    });
  });
});


describe('stringLongValidityCheck should return ', function() {
  var strings = {
    '123454': {length: 5, result: false},
    '23!': {length: 3, result: true},
    '@233': {length: 3, result: false}
  };

  Object.keys(strings).forEach(function(string) {
    it( strings[string].result + " given " +string + ' compared with length ' + strings[string].length, function() {
      stringLongValidityCheck(string, strings[string].length).should.equal(strings[string].result);
    });
  });
});
