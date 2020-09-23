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
	
	// Smooth Scrolling
	
	document.getElementById('Button').addEventListener('click', function (e)
	{
		e.preventDefault();
		scrollTo(document.documentElement, document.getElementById('Games').offsetTop, 400);
	});
	
	// Get the refs.json structure
	
	fetch ('refs.json').then (
		response => response.json()
	).then (
		(json) => {
			
			var grid = document.getElementById('grid');
			
			for(u in json.uids)
			{
				
				if( u !== 'defaultIcon' ) {
					
					var name = json.uids[u][0],
						sName = name.replace(' – ', ': '),
						imgName = name.replace("'", '%27').replace('"', '%22').replace(' ', '%20').replace('&', '%26').replace('?', '%3F'),
						item = `
						<a href="https://stadiaicons.web.app/` + u + `/?fullName=` + name + `&shortName=` + sName + `" target="_blank">
							<figure style="background: url('` + json.datasets['images-192'].uri + imgName + json.other.altSuffix + json.datasets['images-192'].extension + `') no-repeat scroll;">
								<img src="` + json.datasets['images-192'].uri + imgName + json.datasets['images-192'].extension + `" alt="[` + name + ` icon]" title="` + sName + `"/>
								<figcaption>` + name + `</figcaption>
							</figure>
						</a>`;
					grid.insertAdjacentHTML('beforeend', item);
				}
				
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
			document.getElementById('Info').style.display = 'flex';
			document.getElementById('Games').style.display = 'flex';
			document.body.classList.add('loaded');
		}
	}, 12000);
	
	Promise.all(Array.from(document.images).filter(img => !img.complete).map(img => new Promise(resolve => {
		img.addEventListener('load', resolve);
		img.addEventListener('error', resolve);
	}))).then(() => {
		hasResolved = true;
			document.getElementById('Info').style.display = 'flex';
		document.getElementById('Games').style.display = 'flex';
		document.body.classList.add('loaded');
	});
}


function scrollTo(element, to, duration) {
	if (duration <= 0) return;
	var difference = to - element.scrollTop;
	var perTick = difference / duration * 10;

	setTimeout(function() {
		element.scrollTop = element.scrollTop + perTick;
		if (element.scrollTop === to) return;
		scrollTo(element, to, duration - 10);
	}, 10);
}