const functions = require('firebase-functions');

exports.shortcut = functions.https.onRequest((request, response) => {
	
	var errors = {};
	
	var uid = require('./inc/get/uid.js')(request.path);
	if (uid.hasOwnProperty('errors'))
	{
		errors.uid = uid.errors;
	}
			
			
	var params = require('./inc/get/params.js')(request.query);
	if (params.hasOwnProperty('errors'))
	{
		errors.params = params.errors;
	}
			
			
	var refs = require('./inc/get/refs.js')(require('./refs.json'));
	if (refs.hasOwnProperty('errors'))
	{
		errors.refs = refs.errors;
	}
	
	var info = require('./inc/gather.js')(request, true, uid.uid, params, refs.data);
	if (info.hasOwnProperty('errors'))
	{
		errors = errors.concat(info.errors);
	}
	
	response.send(require('./inc/shortcut.js')(info, errors));
	
});

exports.webmanifest = functions.https.onRequest((request, response) => {
		
	var errors = {};
	
	var uid = require('./inc/get/uid.js')(request.path);
	if (uid.hasOwnProperty('errors'))
	{
		errors.uid = uid.errors;
	}
			
			
	var params = require('./inc/get/params.js')(request.query);
	if (params.hasOwnProperty('errors'))
	{
		errors.params = params.errors;
	}
			
			
	var refs = require('./inc/get/refs.js')(require('./refs.json'));
	if (refs.hasOwnProperty('errors'))
	{
		errors.refs = refs.errors;
	}
	
	var info = require('./inc/gather.js')(request, true, uid.uid, params, refs.data);
	
	response.send(require('./inc/webmanifest.js')(info, errors));
	
});

exports.verify = functions.https.onRequest((request, response) => {
	
	
	var errors = {};
	
	var uid = require('./inc/get/uid.js')(request.path);
	if (uid.hasOwnProperty('errors'))
	{
		errors.uid = uid.errors;
	}
			
			
	var params = require('./inc/get/params.js')(request.query);
	if (params.hasOwnProperty('errors'))
	{
		errors.params = params.errors;
	}
			
			
	var refs = require('./inc/get/refs.js')(require('./refs.json'));
	if (refs.hasOwnProperty('errors'))
	{
		errors.refs = refs.errors;
	}
	
	response.send(require('./inc/gather.js')(request, true, uid.uid, params, refs.data));
	
});

exports.coffee = functions.https.onRequest((request, response) => {
	
	const cors = require('cors');
	cors(
		{
			'methods': 'GET',
			'origin': ['https://elowry.github.io', 'https://stadiaicons.web.app']
		}
	)(request, response, () => {
		var coffeeToken = require('./secure/coffeetoken.json');
		
		require('./inc/get/coffee.js')(response, coffeeToken);
	});
	
});