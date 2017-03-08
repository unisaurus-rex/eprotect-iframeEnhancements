/**
 * @file formatPan-js
 * Format PAN field by adding white space
 */

/**
 * Return card type from pan
 * @function detectCardType
 * @param {String} number 
 * @returns {Boolean}
 */
function detectCardTypePartial(pan) {
  var re = {
    //visa: 4
    visa: /^4/,
    //mastercard 50 - 55 OR 51-55?
    mastercard: /^5[1-5]/,
    mastercard: /^222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720/,
    //34, 37
    amex: /^3[47]/,
    //discover: 6011, 622126-622925, 644-649, 65
    discover: /^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)/
  };

  for(var key in re) {
    if(re[key].test(pan)) {
        return key;
    }
  }
  return undefined;
}

function formatPan( pan ){
  var type;
  if ( (pan.length < 5 || type == undefined) ){
    type = detectCardTypePartial(pan);
  }

  return function(){
    if (type == "amex"){
      if (pan.length % 4 == 0 || pan.length % 11 == 0 ){
        return pan + ' ';
      }else return pan;
    }
    else{
      if (pan.length % 4 == 0 || pan.length % 9 == 0 || pan.length % 14 == 0/* check pan size? */){
        return pan + ' ';
      }else return pan;
    }
  }
}
