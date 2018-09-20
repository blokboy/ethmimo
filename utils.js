
/**
* Checks if a variable is a string
*
* @param     {String}           s           A string
* @return    {Boolean}
*/
function isString(s) {
	return typeof(s) === 'string' || s instanceof String;
}

module.exports = {
	isString
}