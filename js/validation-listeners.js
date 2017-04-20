/**
 * @file validation-listeners.js
 * event listeners for field validation
 */

//Account Number Events
$('#accountNumber').blur(panBlur);
$('#accountNumber').bind("paste", panPaste);
$('#accountNumber').alphanum({
    allowSpace         : true,
    allowNumeric       : true,
    allowUpper         : false,
    allowLower         : false
});

$("#accountNumber").keyup(panKeyUp);

// CVC Events
$('#cvv').blur(cvcBlur)
$('#cvv').bind("paste", cvcPaste);
$('#cvv').numeric();

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