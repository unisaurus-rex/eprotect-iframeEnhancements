var expect = chai.expect;


var today = new Date();
var validMonth = today.getMonth() + 1; //month starts index at zero
var validYear = today.getFullYear();

var pastMonth = today.getMonth();
var pastYear = today.getFullYear() -1;

describe('checkExpirationdate should', function() {
  it('return true given the current month and year', function() {
    //expect(foo).to.equal('bar');
    var test = checkExpirationDate(validMonth, validYear);
    expect(test).to.equal(true);
  });

  it('return false given a valid month and invalid year', function() {
  	//expect(foo).to.equal('bar');
  	var test = checkExpirationDate(validMonth, pastYear);
  	expect(test).to.equal(false);
	});

  it('return false given an invalid month and valid year', function() {
  	//expect(foo).to.equal('bar');
  	var test = checkExpirationDate(pastMonth, validYear);
  	expect(test).to.equal(false);
	});

});
