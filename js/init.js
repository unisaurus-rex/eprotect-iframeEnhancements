/**
 * @file init.js
 */

/**
 * Initialize the form by clearing the form fields
 * @function init
 */
function init(){
	window.onpageshow = function(event) {
		clearFields();
	};	
}

/**
 * Clear PAN, CVC, and expiration date form fields
 * @function clearFields
 */
function clearFields(){
	document.getElementById("accountnumber").value = "";
	document.getElementById("cvc").value = "";
	document.getElementById("expMonth").value = "";
	document.getElementById("expYear").value = "";
}
