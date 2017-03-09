/**
 * @file field-ux.js
 *Form UI/UX DOM manipulation
 */

/**
 * Switches the credit card icon svg on the #ccicon html element
 * @function iconSwitch
 * @returns {String}
 */


var cardvar;//a dummy value for testing
$('#accountnumber').blur(iconSwitch); //On blur event listener that should be used on the input fields


function iconSwitch() {

	var icon = $('#ccicon');

	switch (cardvar) {
		case 'amex':
			icon.removeClass().addClass('fa fa-cc-amex');
			break;

		case 'discover':
			icon.removeClass().addClass('fa fa-cc-discover');
			break;

		case 'mastercard':
			icon.removeClass().addClass('fa fa-cc-mastercard');
			break;

		case 'visa':
			icon.removeClass().addClass('fa fa-cc-visa');
			break;

		default:
			icon.removeClass().addClass('fa fa-credit-card');
			break;
	}
	return cardvar;
};

/**
 * A simple DOM tester that logs the current state of certain variables
 * @function blurTest
 */

function blurTest () {
	console.log(cardvar);
}

