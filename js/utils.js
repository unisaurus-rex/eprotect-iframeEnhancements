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
