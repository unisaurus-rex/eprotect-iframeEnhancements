/**
 * @file ineligible-chars.js
 * pure function for validating characters typed
 */

/**
 * @function isIneligible
 * @param {String} char - character to check
 * @return {Boolean} true if character is not numeric 
 */
function isIneligible(char) {
  var re = /^\D$/; // matches any length one string with non-numeric character
  return re.test(char);
}
