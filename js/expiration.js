/**
 * Compare input with server month and year to see if the expiration date has passed
 * @function checkExpirationDate
 * @param {String} month - xx format
 * @param {String} year - xxxx format
 * @returns {Boolean}
 */
function checkExpirationDate(month, year){
	//get current date
	var today = new Date();
	var currentMonth = today.getMonth() + 1; //month starts index at zero
	var currentYear = today.getFullYear(); 

	//check year if year has passed
	if (year < currentYear){
		return false;
	}
	//check if month has passed
	else if( month < currentMonth && year == currentYear ){
		return false;
	}else return true;
}

window.checkExpirationDate = checkExpirationDate;