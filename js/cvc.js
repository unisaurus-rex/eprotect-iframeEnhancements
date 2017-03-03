/**
 * Check CVC for non numberic characters
 * @function CvcNumericCheck
 * @param {String} cvc
 * @returns {Boolean}
 */
function cvcNumericCheck(cvc){
	var test = /^[0-9]+$/.test(cvc);
	return test;
}

/**
 * Check if cvc length is too short
 * @function cvcShortLengthCheck
 * @param {String} cvc
 * @returns {Boolean}
 */
function cvcShortLengthCheck(pan, cvc){
	var type = detectCardType(pan);
	var length = getCvcLength(type);
	return stringShortValidityCheck(cvc, length);
	//if (cvc.length < length)
		//return false;
	//else
		//return true;
}

/**
 * Check if cvc length is too long
 * @function cvcLongLengthCheck
 * @param {String} cvc
 * @returns {Boolean}
 */
function cvcLongLengthCheck(pan, cvc){
	var type = detectCardType(pan);
	var length = getCvcLength(type);
	return stringLongValidityCheck(cvc, length);
	//if (cvc.length > length)
		//return false;
	//else
		//return true;
}

function stringLongValidityCheck(str, length){
	if (str.length > length)
		return false;
	else 
		return true;
}

function stringShortValidityCheck(str, length){
	if (str.length < legnth)
		return false;
	else
		return true;
}


/**
 * Return length of CVC given a card type
 * @function getCvcLength
 * @param {String} type
 * @returns {Number}
 */
function getCvcLength(type){
	var map = {
		visa: 3,
		mastercard: 3,
		discover: 3,
		amex: 4,	
	};
	if (type in map){
		console.log(map[type]);
		return map[type];
	}
	else
		return 4;
}

/**
 * Return card type from pan
 * @function detectCardType
 * @param {String} number 
 * @returns {Boolean}
 */
function detectCardType(pan) {
  var re = {
    electron: /^(4026|417500|4405|4508|4844|4913|4917)\d+$/,
    maestro: /^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)\d+$/,
    dankort: /^(5019)\d+$/,
    interpayment: /^(636)\d+$/,
    unionpay: /^(62|88)\d+$/,
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,
    amex: /^3[47][0-9]{13}$/,
    diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    jcb: /^(?:2131|1800|35\d{3})\d{11}$/
  };

  for(var key in re) {
    if(re[key].test(pan)) {
        return key;
    }
  }
}

/**
 * Check CVC for non numberic characters and for exact length
 * @function cvcLengthAndNumbericCheck
 * @param {String} cvc
 * @param {Number} length 
 * @returns {Boolean}
 */
function cvcLengthAndNumericCheck(cvc, length){
	var regex = new RegExp("^[0-9]{" + length + "}$");
	var isnum = /^[0-9]+$/.test(cvc);
	return isnum;
}


window.cvcNumericCheck =  cvcNumericCheck;
window.cvcLongLengthCheck = cvcLongLengthCheck;
window.cvcShortLengthCheck = cvcShortLengthCheck;