/**
 * @file validation-listeners.js
 * event listeners for field validation
 */

//Account Number Events
$('#accountnumber').blur(panBlur);

$('#accountnumber').bind("paste", panPaste);

$("#accountnumber").keypress(panKeyPress);

// CVC Events
$('#cvc').blur(cvcBlur)

$('#cvc').bind("paste", cvcPaste);

$("#cvc").keypress(cvcKeyPress);
