import getTotal from './get-total.js';


/**
 * Add two or more numbers together
 * @param {...Number} nums The numbers to add
 */
function add (...nums) {

	// Get the first number and remove it from the array
	let total = getTotal(nums);

	// Loop through each number and do math
	for (let num of nums) {
		total = total + num;
	}

	// Return the total
	return total;

}


let total = add(1, 2, 3);
console.log(total);