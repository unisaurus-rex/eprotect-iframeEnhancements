function validateAndUpdateCVC(cvc){
 //get pan
  var pan = $("#accountnumber").val();

  //strip spaces  
  pan = stripSpaces(pan);

  //if cvv is not empty run cvv validations
  var cvcErrs = cvcValidations(pan, cvc)

  //update dom
  cvcValidUi(cvcErrs);
}

function cvcKeyPress(e) { 
  var charCode = e.which || e.keyCode;

  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
  }else{
    return true;
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
  //get cvc
  var cvc = e.originalEvent.clipboardData.getData('text');

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