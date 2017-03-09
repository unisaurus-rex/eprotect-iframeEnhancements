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
  var type;

  //will not work if copy paste
  //max of 4 numbers to detect card type
  if ( (pan.length < 5) ){
    type = detectCardTypePartial(pan);
  }

  if (type == "amex"){
    /*xxxx xxxxxx xxxxx*/
    return formatFourSixFive(pan);
  }
  else if (type == "visa" || type == "mastercard" || type == "discover" 
        || type == "jcb" || type == "dankort"){
    /* xxxx xxxx xxxx xxxx*/
    return formatFourFourFourFour(pan);
  }
  else
    return pan;

}

/**
 * Format PAN using "xxxx xxxxxx xxxxx" pattern
 * Function will not work if pan has been pasted
 * @function formatFourSixFive
 * @param {String} pan 
 * @returns {String}
 */
function formatFourSixFive(pan){
  if (pan.length % 4 == 0 || pan.length % 11 == 0 ){
    return pan + ' ';
  }else {return pan;}
}

/**
 * Format PAN using "xxxx xxxx xxxx xxxx" pattern
 * Function will not work if pan has been pasted
 * @function formatFourFourFourFour
 * @param {String} pan 
 * @returns {String}
 */
function formatFourFourFourFour(pan){
  if (pan.length % 4 == 0 || pan.length % 9 == 0 || pan.length % 14 == 0){
    return pan + ' ';
  }else {return pan;}  
}

window.formatPan = formatPan;