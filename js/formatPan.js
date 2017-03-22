/**
 * @file formatPan-js
 * Format PAN field by adding white space
 */

/**
 * Return card type from pan
 * @function detectCardTypePartial
 * @param {String} number 
 * @returns {String}
 */
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
 * Format PAN by adding spaces
 * If card type can not be detected no formatting will be added
 * Function willnot work if PAN has been pasted
 * @function formatPan
 * @param {String} pan 
 * @returns {String}
 */
function formatPan( pan ){
  var type = detectCardTypePartial(pan);

  if (type == "amex"){
    return format4x6x5(pan);
  }
  else if (type == "visa" || type == "mastercard" || type == "discover" 
        || type == "jcb" || type == "dankort"){
    return format4x4x4x4(pan);
  }
  else
    return pan;
}


/**
 * Format PAN using "xxxx xxxxxx xxxxx" pattern
 * Function will not work if pan has been pasted
 * @function format4x6x5
 * @param {String} pan 
 * @returns {String}
 */
function format4x6x5(pan){

  //start at index of first space
  var i = 4;
  //if i is at valid index
  if (i <= pan.length){
    //check if there is a space
    if (pan.charAt(i) != ' '){
      //if there is no space add one
      pan = pan.slice( 0, i) + " " + pan.slice(i, pan.length);
    }    
  }

  //go to index of second space
  i = 11;
  if (i <= pan.length){
    if (pan.charAt(i) != ' '){
      pan = pan.slice( 0, i) + " " + pan.slice(i, pan.length);
    }    
  }

  return pan;
}

/**
 * Format PAN using "xxxx xxxx xxxx xxxx" pattern
 * Function will not work if pan has been pasted
 * @function format4x4x4x4
 * @param {String} pan 
 * @returns {String}
 */
function format4x4x4x4(pan){
  //assume the string passed in has valid characters
  
  //start at index of first space
  var i =4; 
  
  while( i <= pan.length && i < 15 ){
    //check it i is at valid index
    if( i <= pan.length){
      //check if there is a space
      if (pan.charAt(i) != ' '){
        //if there is no space add one
        pan = pan.slice( 0, i) + " " + pan.slice(i, pan.length)
      }
    }
    //jump to location of next space
    i = i+5;
  }
  //return formatted pan
  return pan;
}
