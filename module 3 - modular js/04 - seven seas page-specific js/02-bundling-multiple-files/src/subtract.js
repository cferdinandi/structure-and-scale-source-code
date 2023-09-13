import getTotal from './get-total.js';


/**
 * Subtract two or more numbers from each other
 * @param {...Number} nums The numbers to subtract
 */
function subtract (...nums) {

	// Get the first number and remove it from the array
	let total = getTotal(nums);

	// Loop through each number and do math
	for (let num of nums) {
		total = total - num;
	}

	// Return the total
	return total;

}


let total = subtract(10, 1, 1);
console.log(total);