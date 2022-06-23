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
	
window.addEventListener( 'load', function ()
{

	fetch('https://stadiaicons.web.app/coffee.json').then(response => {
		if (!response.ok) {
			throw new Error("HTTP error " + response.status);
		}
		return response.json();
	}).then(json => {
		if (json.hasOwnProperty('valid') && json.valid && json.hasOwnProperty('subs') && Number.isInteger(parseInt(json.subs)))
		{
			document.getElementById('coffee').innerHTML = json.subs + '❤';
		}
		else
		{
			console.error( '%cStadiaIcons', 'display: inline-block; padding: 0em 0.2em; font-size: 1.08em; border-radius: 0.2em; font-weight: 900; -webkit-linear-gradient(107deg,#ff4c1d,#9b0063); background: linear-gradient(107deg,#ff4c1d,#9b0063); font-family:"Google Sans","Product Sans","Roboto",sans-serif;', 'ByMeACoffee API Error: Subscription count not found; ', json );
		}
	}).catch( e => {
		this.dataError = true;
		console.error( '%cStadiaIcons', 'display: inline-block; padding: 0em 0.2em; font-size: 1.08em; border-radius: 0.2em; font-weight: 900; -webkit-linear-gradient(107deg,#ff4c1d,#9b0063); background: linear-gradient(107deg,#ff4c1d,#9b0063); font-family:"Google Sans","Product Sans","Roboto",sans-serif;', 'ByMeACoffee API Error: ' + e );
	})

});