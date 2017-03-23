/**
 * @file cvc-validation-js
 * pure validation function@s for the CVC Input field
 */

/*
 * Validations:
 * 1) CVC under length
 * 2) CVC over length
 * 3) CVC not numeric
 */

/**
 * Check CVC for non numberic characters
 * @function cvcNotNumeric
 * @param {String} cvc
 * @returns {Boolean}
 */
function cvcNotNumeric(cvc){
  // regex that matches 1 or non-numeric character 
  var re = /\D+/;
  return re.test(cvc); 
}

/**
 * Check if cvc length is too short
 * @function cvcShort
 * @param {String} cvc
 * @returns {Boolean}
 */
function cvcShort(pan, cvc){
	var type = detectCardTypePartial(pan);
	var length = getCvcLengthByCardType(type);
	return underLength(cvc, Math.floor(length));
}

/**
 * Check if cvc length is too long
 * @function cvcLong
 * @param {String} cvc
 * @returns {Boolean}
 */
function cvcLong(pan, cvc){
	var type = detectCardTypePartial(pan);
	var length = getCvcLengthByCardType(type);
	return overLength(cvc, Math.ceil(length));
}

/**
 * Check if string length is too long
 * @function overLength
 * @param {String} str
 * @param {Number} length
 * @returns {Boolean}
 */
function overLength(str, length){
	if (str.length > length)
		return true;
	else 
		return false;
}

/**
 * Check if string length is too short
 * @function underLength
 * @param {String} str
 * @param {Number} length
 * @returns {Boolean}
 */
function underLength(str, length){
	if (str.length < length)
		return true;
	else
		return false;
}


/**
 * Return length of CVC given a card type
 * @function getCvcLengthByCardType
 * @param {String} type
 * @returns {Number}
 */
function getCvcLengthByCardType(type){
	var map = {
		visa: 3,
		mastercard: 3,
		discover: 3,
		amex: 3.5, //amex can be 3 or 4
		maestro: 3,
		forbrugsforeningen: 3,
		dankort: 3,
		diners: 3,
		unionpay: 3,
		jcb: 3
	};
	if (type in map){
		return map[type];
	}
	else
		return 3.5;
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
function detectCardTypePartial(pan) {
  var re = {
    //visa: 4
    visa: /^4/,
    //mastercard 51-55 and 22-27
    mastercard: /^(5[1-5]|2[2-7])/, 
    //amex 34, 37
    amex: /^3[47]/, 
    //jcb 35
    jcb: /^35/, 
    //unionpay 62, 88
    unionpay: /^(62|88)/, 
    //diners club 30, 36, 38, 39
    diners: /^(30|36|38|39)/, 
    //dankort 5019
    dankort: /^5019/, 
    //forbrugsforeningen 600
    forbrugsforeningen: /^600/,
    //maestro 5018, 502, 503, 506, 56, 58, 639, 6220, 67
    maestro: /^(5018|502|503|506|56|58|639|6220|67)/, 
    //discover: 60, 64, 65, 622
    discover: /^(60|6[4,5]|622)/ 
  };

  for(var key in re) {
    if(re[key].test(pan)) {
        return key;
    }
  }
  return undefined;
}

/**
 * Return card type from pan
 * @function detectCardType
 * @param {String} number 
 * @returns {String}
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
