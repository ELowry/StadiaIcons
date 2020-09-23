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


(function() {
	scrollTo();
})();

function scrollTo() {
	const links = document.querySelectorAll('.scroll');
	links.forEach(each => (each.onclick = scrollAnchors));
}

function scrollAnchors(e, respond = null) {
	const distanceToTop = el => Math.floor(el.getBoundingClientRect().top);
	e.preventDefault();
	var targetID = (respond) ? respond.getAttribute('href') : this.getAttribute('href');
	const targetAnchor = document.querySelector(targetID);
	if (!targetAnchor) return;
	const originalTop = distanceToTop(targetAnchor);
	window.scrollBy({ top: originalTop, left: 0, behavior: 'smooth' });
	const checkIfDone = setInterval(function() {
		const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
		if (distanceToTop(targetAnchor) === 0 || atBottom) {
			targetAnchor.tabIndex = '-1';
			targetAnchor.focus();
			window.history.pushState('', '', targetID);
			clearInterval(checkIfDone);
		}
	}, 100);
}