/**
 * @file validation-listeners.js
 * event listeners for field validation
 */

//Account Number Events
$('#accountNumber').blur(panBlur);
$('#accountNumber').bind("paste", panPaste);
$("#accountNumber").keypress(panKeyPress);
$("#accountNumber").keyup(panKeyUp);

// CVC Events
$('#cvv').blur(cvcBlur)
$('#cvv').bind("paste", cvcPaste);
$("#cvv").keypress(cvcKeyPress);

// Expiration Events
$('#expMonth').blur(handleMonthEvent);
$('#expMonth').change(handleMonthEvent);
$('#expYear').blur(handleYearEvent);
$('#expYear').change(handleYearEvent);

//clear success and errors on focus
$("#cvv").focus( function(e){
	var elements = $('#cvvDiv, #cvv,#cvvLabelBefore,#cvvNumberLabelAfter,#cvvLabelText')
	elements.removeClass();
});
$("#accountNumber").focus( function(e){
	var elements = $('#numberDiv,#accountNumber,#accountNumberLabelBefore,#accountNumberLabelAfter,#accountNumberLabelText')
	elements.removeClass();
});