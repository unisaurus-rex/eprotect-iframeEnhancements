/**
 * @file validation-listeners.js
 * event listeners for field validation
 */
function panInitEvents() {
  //blur event
  $('#accountnumber').blur(function() {
    panBlur();
  })
  //paste event
  $('#accountnumber').bind("paste", panPaste);

  //keypress
  $("#accountnumber").keypress(panKeyPress);

}

function panKeyPress(e) { 
  var charCode = e.which || e.keyCode;

  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
  }else{

    if (charCode == 8 || charCode == 9){
      return true;
    }
    
    var c = String.fromCharCode(charCode);

    //get pan
    var pan = $("#accountnumber").val();

    //strip of white space
    pan = stripSpaces(pan);

    //add keypressed
    pan = pan + c;

    //update dom with formatted pan
    $("#accountnumber").val(formatPan(pan));

    //update card icon based on card type
    var type = detectCardTypePartial(pan);
    iconSwitch(type);

    return false;
  }
}

function panBlur() {
  //get pan
  var pan = $("#accountnumber").val();

  //strip spaces  
  pan = stripSpaces(pan);

  //update dom with formatted pan
  $("#accountnumber").val(formatPan(pan));

  //validate pan
  var panErrs = panValidations(pan);

  //update dom
  panValidUi(panErrs);

  //update card icon based on card type
  var type = detectCardTypePartial(pan);
  iconSwitch(type);

  //get cvv
  var cvc = $("#cvc").val();

  //if cvc has been filled out validate it and update dom
  if (cvc) {
    var cvcErrs = cvcValidations(pan, cvc)
    cvcValidUi(cvcErrs);
  }
}

function panPaste(e) {
  //get pan
  var pan = e.originalEvent.clipboardData.getData('text');

  //strip spaces  
  pan = stripSpaces(pan);

  //update dom with formatted pan
  $("#accountnumber").val(formatPan(pan));

  //validate pan
  var panErrs = panValidations(pan);

  //update dom
  panValidUi(panErrs);

  //update card icon based on card type
  var type = detectCardTypePartial(pan);
  iconSwitch(type);

  //get cvv
  var cvc = $("#cvc").val();

  if (cvc) {
    //if cvv is not empty run cvv validations
    var cvcErrs = cvcValidations(pan, cvc)

    //update dom
    cvcValidUi(cvcErrs);
  }
  //do not paste text from clipboard
  return false;
}

function cvcInitEvents() {
  //blur event
  $('#cvc').blur(function() {
    cvcBlur();
  })
  //paste event
  $('#cvc').bind("paste", cvcPaste);

  //keypress
  $("#cvc").keypress(cvcKeyPress);

}

function cvcKeyPress(e) { 
  var charCode = e.which || e.keyCode;

  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
  }else{

    if (charCode == 8 || charCode == 9){
      return true;
    }
    
    var c = String.fromCharCode(charCode);

    //get pan
    var cvc = $("#cvc").val();

    //strip of white space
    cvc = stripSpaces(cvc);

    //add keypressed
    cvc = cvc + c;

    //update dom with formatted pan
    $("#cvc").val(cvc);

    return false;
  }
}

function cvcBlur() {
  //get pan
  var cvc = $("#cvc").val();
  //strip spaces  
  cvc = stripSpaces(cvc);
  //get pan
  var pan = $("#accountnumber").val();
  //strip spaces  
  pan = stripSpaces(pan);
  //if cvv is not empty run cvv validations
  var cvcErrs = cvcValidations(pan, cvc)

  //update dom
  cvcValidUi(cvcErrs);
}

function cvcPaste(e) {

  //get pan
  var cvc = e.originalEvent.clipboardData.getData('text');
  console.log(cvc);
  //update dom with cvc
  $("#cvc").val(cvc);

  //get pan
  var pan = $("#accountnumber").val();
  //strip spaces  
  pan = stripSpaces(pan);
  //if cvv is not empty run cvv validations
  var cvcErrs = cvcValidations(pan, cvc)

  //update dom
  cvcValidUi(cvcErrs);
  //do not paste text from clipboard
  return false;
}


panInitEvents();
cvcInitEvents();