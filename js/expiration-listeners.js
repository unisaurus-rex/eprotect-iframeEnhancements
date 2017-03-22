/**
 * event handler
 * @function handleMonthEvent
 * @param {Object} e - event object
 */
function handleMonthEvent(e) {
  // can't validate the month without the year
  var year = $('#expYear').val();

  // if year is undefined, no way to know if month invalid
  if(year !== null) {
    // get selected month value
    // month dropdown has a default selected value so don't need to check for undefined
    var month = e.target.value;
    var notValid = monthNotValid(monthStrToInt(month), parseInt("20" + year));

    console.log("month: " + month + " year: " + year);

    // Update the dom
    // monthValid expects true if month is valid so have to flip the value
    monthValidUi(!notValid);
  }

}
