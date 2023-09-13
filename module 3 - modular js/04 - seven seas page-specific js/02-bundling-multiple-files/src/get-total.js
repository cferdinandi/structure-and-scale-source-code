/**
 * Get the starting total
 * @param  {Array} nums The numbers to do math on
 * @return {Number}     The starting total
 */
function getTotal (nums) {

	// Make sure there are numbers
	if (!nums.length) return 0;

	// Get the first number and remove it from the array
	return nums.shift();

}


export default getTotal;