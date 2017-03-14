/**
 * @file field-ux.js
 *Form UI/UX DOM manipulation
 */

/**
 * Switches the credit card icon svg on the #ccicon html element
 * @function iconSwitch
 * @returns {String}
 */


var cardvar = "";//a dummy value for testing
var panValid = true;
var monthValid = false;
var yearValid = true;
var cvcValid = true;
$('#accountnumber').blur(panValidUi); //On blur event listener that should be used on the input fields
$('#accountnumber').blur(iconSwitch);
$('#expMonth').blur(monthValidUi); //On blur event listener run the UI
$('#expYear').blur(yearValidUi); //On blur event listener run the UI
$('#cvc').blur(cvcValidUi); //On blur event listener run the UI



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

function panValidUi() {
	var elements = $('#accountnumber,#accountNumberLabelBefore,#accountNumberLabelAfter,#accountNumberLabelText')

	if (panValid == true) {
		elements.removeClass().addClass('valid')
	}
	else {
		elements.removeClass().addClass('invalid')
	}
};

function monthValidUi() {
	var elements = $('#expMonth,#expMonthLabelBefore,#expMonthLabelAfter,#expDateLabelText')

	if (monthValid == true) {
		elements.removeClass().addClass('valid')
	}
	else {
		elements.removeClass().addClass('invalid')
	}
	if (monthValid == false || yearValid == false) {
		$('#expDateLabelText').removeClass().addClass('invalid')
	}
};

function yearValidUi() {
	var elements = $('#expYear,#expYearLabelBefore,#expYearLabelAfter,#expDateLabelText')

	if (yearValid == true) {
		elements.removeClass().addClass('valid')
	}
	else {
		elements.removeClass().addClass('invalid')
	}
	if (monthValid == false || yearValid == false) {
		$('#expDateLabelText').removeClass().addClass('invalid')
	}
};

function cvcValidUi() {
	var elements = $('#cvc,#cvvLabelBefore,#cvvNumberLabelAfter,#cvvLabelText')

	if (cvcValid == true) {
		elements.removeClass().addClass('valid')
	}
	else {
		elements.removeClass().addClass('invalid')
	}
};

/**
 * A function to change the inputs class valid to invalid
 * @function blurTest
 */





/**
 * A simple DOM tester that logs the current state of certain variables
 * @function blurTest
 */

function blurTest() {
	console.log(cardvar);
}

