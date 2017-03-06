/**
 * Compare input with server month and year to see if the expiration date has passed
 * Current year and current month are considered valid (Caution: some cards expire at the beginning of the month)
 * @function validExpirationDate
 * @param {String} month - xx format
 * @param {String} year - xxxx format
 * @returns {Boolean}
 */
function validExpirationDate(month, year){
	//get current date
	var today = new Date();
	var currentMonth = today.getMonth() + 1; //month begins index at 0
	var currentYear = today.getFullYear(); 

	//if year has passed
	if (year < currentYear){
		return false;
	}
	//if month has passed in current year
	else if( month < currentMonth && year == currentYear ){
		return false;
	}else return true;
}