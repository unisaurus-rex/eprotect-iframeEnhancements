/**
 * @file utils.js
 * helper functions
 */

/**
 * @function monthStrToInt
 * @param {String} str - value connected to the expMonth dropdown in the format "XX"
 */
function monthStrToInt(str) {
  var re = /^0(\d)$/; // string of length 2 starting with 0 and ending with a digit

  var result = re.exec(str); // returns null if no match, otherwise returns array [match, capture]

  if(result !== null) {
    // get the second digit and parse to integer
    return parseInt(result[1]);
  }

  // else parse the whole string as an integer
  return parseInt(str);
  
}

/**
 * @function stripSpaces
 * @param {String} str 
 */
function stripSpaces(str){
	if (str){
		return str.replace(/ /g,'');		
	}
	else return "";
}

/**
 * @function errLookUp
 * Return error class given a function
 * @param {String} str 
 */
function errLookUp(func){
	obj = {
		isMod10: "error-871",
		panShort: "error-872",
		panLong: "error-873",
		panNotNumeric: "error-874",
		cvcNotNumeric: "error-881",
		cvcShort: "error-882",
		cvcLong: "error-883"
	}
	return obj[func];
}