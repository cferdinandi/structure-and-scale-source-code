// The files to bundle
let files = ['add.js', 'subtract.js'];

// Create the bundle object
export default files.map(function (file) {
	return {
		input: `src/${file}`,
		output: {
			file: file,
			format: 'iife'
		}
	};
});