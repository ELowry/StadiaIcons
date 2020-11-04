const functions = require('firebase-functions');
const validator = require('validator');

module.exports = function(log)
{
	var logging = false,
		toPush = {};
	
	// LOG MESSAGE
	
	if (log.hasOwnProperty('message') || log.hasOwnProperty('object'))
	{
		if (!log.hasOwnProperty('type') && !(log.type === 'log' || log.type === 'info' || log.type === 'warn' || log.type === 'error'))
		{
			log.type = 'info';
		}
		
		if (!log.hasOwnProperty('message'))
		{
			if (logging)
			{
				functions.logger[log.type](log.message);
			}
			toPush.object = log.object;
		}
		else if (!log.hasOwnProperty('object'))
		{
			if (logging)
			{
				functions.logger[log.type](log.message);
			}
			toPush.message = log.message;
		}
		else
		{
			if (logging)
			{
				functions.logger[log.type](log.message, log.object);
			}
			toPush.message = log.message;
			toPush.object = log.object;
		}
		
		if (log.hasOwnProperty('array'))
		{
			if (typeof log.array === 'undefined' || !Array.isArray(log.array))
			{
				return [toPush];
			}
			log.array.push(toPush);
			return log.array;
		}
	}
	
	return null;
	
}