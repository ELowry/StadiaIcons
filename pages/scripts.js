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
	
window.addEventListener('load', function ()
{
	
	// Get 
	
	fetch ('refs.json').then (
		response => response.json()
	).then (
		(json) => {
			
			var grid = document.getElementById('grid');
			
			for(u in json.uids)
			{
				console.log(json.uids[u]);
			}
			
			setTimeout(function()
			{
				StartLoading()
			}, 200);
			
		}
	).catch ((err) => {
		console.log(err);
	});
});

function StartLoading()
{
	var hasResolved = false;
	
	setTimeout(function()
	{
		if (!hasResolved)
		{
		document.getElementById('Games').style.display = 'flex';
		document.getElementById('Loading').className = '';
		}
	}, 12000);
	
	Promise.all(Array.from(document.images).filter(img => !img.complete).map(img => new Promise(resolve => {
		img.addEventListener('load', resolve);
		img.addEventListener('error', resolve);
	}))).then(() => {
		hasResolved = true;
		document.getElementById('Games').style.display = 'flex';
		document.getElementById('Loading').className = '';
	});
}