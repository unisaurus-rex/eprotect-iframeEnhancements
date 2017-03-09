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
			icon.removeClass().addClass('fa fa-cc-amex fa-lg');
			break;

		case 'discover':
			icon.removeClass().addClass('fa fa-cc-discover fa-lg');
			break;

		case 'mastercard':
			icon.removeClass().addClass('fa fa-cc-mastercard fa-lg');
			break;

		case 'visa':
			icon.removeClass().addClass('fa fa-cc-visa fa-lg');
			break;

		default:
			icon.removeClass().addClass('fa fa-credit-card fa-lg');
			break;
	}
	return cardvar;
};

/**
 * A function to change the inputs class valid to invalid
 * @function blurTest
 */





/**
 * A simple DOM tester that logs the current state of certain variables
 * @function blurTest
 */

function blurTest () {
	console.log(cardvar);
}

