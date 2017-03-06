var expect = chai.expect;


var today = new Date();
var validMonth = today.getMonth() + 1; //month starts index at zero
var validYear = today.getFullYear();

var pastMonth = today.getMonth();
var pastYear = today.getFullYear() -1;

describe('validExpirationDate should', function() {

  it('return true given the current month and year', function() {
    //expect(foo).to.equal('bar');
    var test = validExpirationDate(validMonth, validYear);
    expect(test).to.equal(true);
  });

  it('return false given a valid month and invalid year', function() {
  	//expect(foo).to.equal('bar');
  	var test = validExpirationDate(validMonth, pastYear);
  	expect(test).to.equal(false);
	});

  it('return false given an invalid month and valid year', function() {
  	//expect(foo).to.equal('bar');
  	var test = validExpirationDate(pastMonth, validYear);
  	expect(test).to.equal(false);
	});

  it('return false given an invalid month and invalid year', function() {
  	//expect(foo).to.equal('bar');
  	var test = validExpirationDate(pastMonth, pastYear);
  	expect(test).to.equal(false);
	});

});
