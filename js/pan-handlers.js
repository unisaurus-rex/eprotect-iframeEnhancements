/**
 * @file pan-listeners-js
 * listener functions for pan events
 */

/**
 * @function panKeyUp 
 * handle pan keyup events 
 * @param {Object} e - event object
 */
function panKeyUp(e){
  //get charcode
  var charCode = e.which || e.keyCode;

  //if charCode maps to a number pad key, subtract 48
  //48 is the offset to the number key (row)
  if (charCode >= 96 && charCode <= 105)
    charCode = charCode - 48;

  //get character
  var c = String.fromCharCode(charCode);
  
  //if char is numeric
  if ( !isIneligible(c) || c==" "){
    
    //update field with formatted pan
    var pan = $("#accountNumber").val();
      pan = stripSpaces(pan);
    $("#accountNumber").val(formatPan(pan));  
    
    //update card icon based on card type
    var type = detectCardTypePartial(pan);
    iconSwitch(type);
  }
}
/**
 * @function panBlur 
 * handle pan blur events 
 */
function panBlur() {
  //get pan
  var pan = $("#accountNumber").val();

  //strip spaces  
  pan = stripSpaces(pan);

  //update dom with formatted pan
  $("#accountNumber").val(formatPan(pan));

  //validate pan
  var panErrs = panValidations(pan);

  //update dom
  panValidUi(panErrs);

  //update card icon based on card type
  var type = detectCardTypePartial(pan);
  iconSwitch(type);

  //get cvv
  var cvc = $("#cvv").val();

  //if cvc has been filled out validate it and update dom
  if (cvc) {
    var cvcErrs = cvcValidations(pan, cvc)
    cvcValidUi(cvcErrs);
  }
}

/**
 * @function panPaste 
 * handle pan paste events 
 * @param {Object} e - event object
 */
function panPaste(e) {
  //get pan
  var pan = e.originalEvent.clipboardData.getData('text');

  //strip spaces  
  pan = stripSpaces(pan);

  //update dom with formatted pan
  $("#accountNumber").val(formatPan(pan));

  //validate pan
  var panErrs = panValidations(pan);

  //update dom
  panValidUi(panErrs);

  //update card icon based on card type
  var type = detectCardTypePartial(pan);
  iconSwitch(type);

  //get cvv
  var cvc = $("#cvv").val();

  if (cvc) {
    //if cvv is not empty run cvv validations
    var cvcErrs = cvcValidations(pan, cvc)

    //update dom
    cvcValidUi(cvcErrs);
  }
  //do not paste text from clipboard
  return false;
}