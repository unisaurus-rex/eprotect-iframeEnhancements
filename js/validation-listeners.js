/**
 * @file validation-listeners.js
 * event listeners for field validation
 */

  $('#accountnumber').blur(function() {
    panBlur();
  });

  $('#accountnumber').bind("paste", function(e) {
    panPaste(e);
  });

  //keypress
  $("#accountnumber").keypress(function(e) {
    panKeyPress(e);
  });

  $('#cvc').blur(function() {
    cvcBlur();
  })
  //paste event
  $('#cvc').bind("paste", function(e) {
    cvcPaste(e);
  });

  //keypress
  $("#cvc").keypress(function(e) {
    cvcKeyPress(e);
  });
