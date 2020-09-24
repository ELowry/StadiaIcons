const functions = require('firebase-functions');
const validator = require('validator');

module.exports = function(path)
{
	
	// GRAB UID FROM FILE PATH
	
	var output = {
		uid: validator.trim(validator.whitelist(path, 'a-zA-Z0-9'), '/').replace(/^info\//, '').replace(/\/?stadia\.?webmanifest$/, '')
	};
	
	// GET UID
	
	if (!output.hasOwnProperty('uid') || !output.uid)
	{
		output.errors = require('../logs.js')({
			message: 'The uid is missing.',
			type: 'error',
			array: output.errors
		});
	}
	else if (!validator.isAlphanumeric(output.uid))
	{
		output.errors = require('../logs.js')({
			message: 'The uid is not alphanumeric.',
			object: output.uid,
			type: 'error',
			array: output.errors
		});
	}
	else if (!(output.uid === 'defaultIcon' || validator.matches(output.uid, /^[A-z0-9]{32}rcp1$/)))
	{
		output.errors = require('../logs.js')({
			message: 'The uid does not follow the proper format.',
			object: output.uid,
			type: 'error',
			array: output.errors
		});
	}
	else
	{
		return output;
	}
	
	output.uid = false;
	
	return output;
	
}