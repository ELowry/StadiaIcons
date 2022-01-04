const functions = require('firebase-functions'),
	https = require('https');

module.exports = function ( response, coffeeToken )
{
	let data = {
		subs: null,
		valid: false,
	};

	const coffeeRequest = new Promise((resolve, reject) => {
		const options = {
			hostname: 'developers.buymeacoffee.com',
			path: '/api/v1/supporters',
			headers: {
				'Authorization': coffeeToken.token
			}
		},
			req = https.get(options, res => {
				let body = [];
				res.on('data', d => {
					body.push(d);
				});
				res.on('end', e => {
					data.subs = JSON.parse(Buffer.concat(body).toString()).total;
					data.valid = true;
					resolve(e);
				});
			});
		
		req.on('error', reject);
		
		req.end();
	}).then(() => {
		response.send(data);
	});
};