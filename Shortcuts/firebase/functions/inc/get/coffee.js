	/* LICENSED UNDER AGPL 3.0
	This file is part of StadiaIcons.

	StadiaIcons is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	StadiaIcons is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with StadiaIcons.  If not, see <https://www.gnu.org/licenses/>.
	*/

const functions = require('firebase-functions'),
	https = require('https');

module.exports = function ( response, coffeeToken )
{
	let data = {
		subs: null,
		valid: false,
	};

	new Promise((resolve, reject) => {
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
					try {
						data.subs = JSON.parse(Buffer.concat(body).toString()).total;
						data.valid = true;
					} catch(error) {
						data.subs = null;
						data.valid = false;
						data.error = {
							name: error.name,
							cause: error.cause,
							message: error.message,
							stack: error.stack
						};
					}
					resolve(e);
				});
			});
		
		req.on('error', reject);
		
		req.end();
	}).then(() => {
		response.send(data);
	});
};