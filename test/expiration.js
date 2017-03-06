var expect = chai.expect;


var today = new Date();
var validMonth = today.getMonth() + 1; //month starts index at zero
var validYear = today.getFullYear();

var pastMonth = today.getMonth();
var pastYear = today.getFullYear() -1;

describe('validExpirationDate', function() {

  it('should return true given the current month and year', function() {
    //expect(foo).to.equal('bar');
    var testOne = validExpirationDate(validMonth, validYear);
    expect(testOne).to.equal(true);
  });

  it('should return false given a valid month and invalid year', function() {
  	//expect(foo).to.equal('bar');
  	var testTwo = validExpirationDate(validMonth, pastYear);
  	expect(testTwo).to.equal(false);
	});

  it('should return false given an invalid month and valid year', function() {
  	//expect(foo).to.equal('bar');
  	var testThree = validExpirationDate(pastMonth, validYear);
  	expect(testThree).to.equal(false);
	});

  it('should return false given an invalid month and invalid year', function() {
  	//expect(foo).to.equal('bar');
  	var testFour = validExpirationDate(pastMonth, pastYear);
  	expect(testFour).to.equal(false);
	});

});
