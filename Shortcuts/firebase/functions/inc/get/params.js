const functions = require('firebase-functions');
const validator = require('validator');

module.exports = function(query)
{
	
	// PREPARE PARAMETERS
	
	var params = query,
		fullName = null,
		shortName = null,
		variant = 0,
		alt = false,
		output = {};
	
	// FILTER PARAMETERS
	
	for (k in params)
	{
		params[k] = validator.escape(params[k]);
	}
	
	// Full Name
	if (!params.hasOwnProperty('fullName'))
	{
		output.errors = require('../logs.js')({
			message: 'The fullName parameter is missing.',
			type: 'error',
			array: output.errors
		});
	}
	else
	{
		fullName = validator.trim(params['fullName'].replace('&amp;', '&'));
		output.fullName = fullName;
	}
	
	// Short Name
	if (!params.hasOwnProperty('shortName'))
	{
		shortName = fullName;
	}
	else
	{
		shortName = validator.trim(params['shortName']);
	}
	if (!shortName)
	{
		output.errors = require('../logs.js')({
			message: 'The shortName parameter is missing.',
			type: 'error',
			array: output.errors
		});
	}
	else
	{
		output.shortName = shortName;
	}
	
	// Variant
	if (params.hasOwnProperty('variant'))
	{
		params['variant'] = validator.toInt(params['variant']);
		if (validator.isInt(params['variant'], { min: 0 }))
		{
			vatiant = params['variant'];
		}
	}
	if (!variant && variant !== 0)
	{
		output.errors = require('../logs.js')({
			message: 'The variant parameter is missing.',
			type: 'error',
			array: output.errors
		});
	}
	else
	{
		output.variant = variant;
	}
	
	// Alt
	if (params.hasOwnProperty('alt'))
	{
		alt = validator.toBoolean(params['alt'], true);
	}
	if (!alt && alt !== false)
	{
		output.errors = require('../logs.js')({
			message: 'The alt parameter is missing.',
			type: 'error',
			array: output.errors
		});
	}
	else
	{
		output.alt = alt;
	}
	
	return output;
	
}