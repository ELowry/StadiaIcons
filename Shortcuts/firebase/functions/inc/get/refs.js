const functions = require('firebase-functions');
const validator = require('validator');

module.exports = function(refs)
{
	var output = {
		data: null,
		valid: true,
	}
			
	// CHECKING CONTENTS
	
	// Datasets
	if (refs.hasOwnProperty('datasets'))
	{
		for (key in refs.datasets)
		{
			// extension
			if (refs.datasets[key].hasOwnProperty('extension'))
			{
				refs.datasets[key].extension = validator.escape(refs.datasets[key].extension);
				if (
					refs.datasets[key].extension.charAt(0) !== '.'
					|| refs.datasets[key].extension.length > 6
					|| !validator.isAlphanumeric(validator.ltrim(refs.datasets[key].extension, '.'))
				)
				{
					output.error = require('../logs.js')({
						message: 'The refs.json data structure\\\'s ' + key + ' dataset\\\'s extension value is not valid.',
						type: 'error',
						array: output.error
					});
					output.valid = false;
				}
			}
			else
			{
				output.error = require('../logs.js')({
					message: 'The refs data structure\\\'s ' + key + ' dataset is missing the extension value.',
					type: 'error',
					array: output.error
				});
				output.valid = false;
			}
			// uri
			if (refs.datasets[key].hasOwnProperty('uri'))
			{
				refs.datasets[key].uri = validator.blacklist(refs.datasets[key].uri, '<>\'"\\\$');
				if (!validator.isURL(refs.datasets[key].uri, {
					protocols: ['https'],
					host_whitelist: ['raw.githubusercontent.com']
				}))
				{
					output.error = require('../logs.js')({
						message: 'The refs.json data structure\\\'s ' + key + ' dataset\\\'s uri value is not valid.',
						type: 'error',
						array: output.error
					});
					output.valid = false;
				}
			}
			else
			{
				output.error = require('../logs.js')({
					message: 'The refs data structure\\\'s ' + key + ' dataset is missing the uri value.',
					type: 'error',
					array: output.error
				});
				output.valid = false;
			}
		}
	}
	else{
		output.error = require('../logs.js')({
			message: 'The refs.json data structure is missing the datasets object.',
			type: 'error',
			array: output.error
		});
		output.valid = false;
	}
	
	// Other
	if (refs.hasOwnProperty('other'))
	{
		if (refs.other.hasOwnProperty('altSuffix'))
		{
			refs.other.altSuffix = validator.whitelist(refs.other.altSuffix, '_a-zA-Z');
			if (
				refs.other.altSuffix.charAt(0) !== '_'
				|| refs.other.altSuffix.length > 4
			)
			{
				output.error = require('../logs.js')({
					message: 'The refs.json data structure\\\'s other object value\\\'s altSuffix is not valid.',
					type: 'error',
					array: output.error
				});
				output.valid = false;
			}
		}
		else
		{
			output.error = require('../logs.js')({
				message: 'The refs.json data structure\\\'s other object is missing the altSuffix value.',
				type: 'error',
				array: output.error
			});
			output.valid = false;
		}
	}
	else{
		output.error = require('../logs.js')({
			message: 'The refs.json data structure is missing the others object.',
			type: 'error',
			array: output.error
		});
		output.valid = false;
	}
	
	// uid names
	if (refs.hasOwnProperty('uids'))
	{
		for (key in refs.uids)
		{
			key = validator.whitelist(key, 'a-zA-Z0-9');
			if (
				!refs.uids.hasOwnProperty(key)
				|| !(key === 'defaultIcon' || validator.matches(key, /^[A-z0-9]{32}rcp1$/))
			)
			{
				output.error = require('../logs.js')({
					message: 'The refs.json data structure\\\'s ' + key + ' uid is not a valid game uid.',
					type: 'error',
					array: output.error
				});
				output.valid = false;
			}
			else if (Object.keys(refs.uids[key]).length <= 0)
			{
				output.error = require('../logs.js')({
					message: 'The refs.json data structure\\\'s ' + key + ' uid does not have children.',
					type: 'error',
					array: output.error
				});
				output.valid = false;
			}
			else
			{
				for (subkey in refs.uids[key])
				{
					refs.uids[key][subkey] = validator.blacklist(refs.uids[key][subkey], '\/\\\(\)\[\]"');
					if (!refs.uids[key][subkey])
					{
						output.error = require('../logs.js')({
							message: 'The refs.json data structure\\\'s ' + key + ' uid\\\'s ' + subkey + ' value is not valid.',
							type: 'error',
							array: output.error
						});
						output.valid = false;
					}
				}
			}
		}
	}
	else{
		output.error = require('../logs.js')({
			message: 'The refs.json data structure is missing the uids object.',
			type: 'error',
			array: output.error
		});
		output.valid = false;
	}
	
	// OUTPUT RESULT TO CALLBACK
	
	if (output.valid)
	{
		output.data = refs;
	}

	return output;
}