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
	
console.log( '%cStadiaIcons Shortcuts', 'display: inline-block; margin: 0.4em 0.3em 0.1em; padding: 0.2em; border-radius: 0.2em; font-size: 2.2em; font-weight: 900; -webkit-linear-gradient(107deg,#ff4c1d,#9b0063); background: linear-gradient(107deg,#ff4c1d,#9b0063); font-family:"Google Sans","Product Sans","Roboto",sans-serif; color: #ffffff;' );
console.log( '%cHah, you found me!\nHere\'s a cookie— oh wait no, we don\'t use those; take a croissant instead: 🥐\nIf you\'re experiencing problems with StadiaIcons Shortcuts or are just curious about how things run, please check out the GitHub page:', 'display: inline-block; padding: 0.4em; background: #202124; border-radius: 0.1em; font-size: 1.2em; font-family:"Google Sans","Product Sans","Roboto",sans-serif; color: #d1293d;' );
console.log( '%chttps://github.com/ELowry/StadiaIcons/', 'display: inline-block; padding: 0.4em; background: #202124; border-radius: 0.1em; font-size: 1.2em; font-family:"Google Sans","Product Sans","Roboto",sans-serif; font-weight: 600; color: #ff773d;' );

var gameObjects = {};
	
window.addEventListener( 'load', function ()
{

	// Start Smooth Scrolling
	scrollTo();

	// Get the refs.json structure

	fetch( 'refs.json' ).then(
		response => response.json()
	).then(
		( json ) =>
		{

			/* GRID */

			var grid = document.getElementById( 'grid' ),
				search = document.getElementById( 'searchBar' ),
				searchData = document.getElementById( 'searchDataList' ),
				curr = 0,
				rand = 0;

			if ( Object.hasOwnProperty( 'keys' ) )
			{
				rand = Math.floor( Math.random() * Object.keys( json.uids ).length );
			}
			else
			{
				rand = Math.floor( Math.random() * 100 )
			}

			for ( u in json.uids )
			{

				if ( u !== 'defaultIcon' )
				{

				/* GRID */

					var name = json.uids[u][0],
						fName = name.replace( ' – ', ': ' ),
						sName = name.split( ' – ' )[0],
						imgName = name.replace( "'", '%27' ).replace( '"', '%22' ).replace( ' ', '%20' ).replace( '&', '%26' ).replace( '?', '%3F' ),
						item = `
						<a id="` + u + `" href="https://stadiaicons.web.app/` + u + `/?fullName=` + imgName + `&shortName=` + sName.replace( "'", '%27' ).replace( '"', '%22' ).replace( ' ', '%20' ).replace( '&', '%26' ).replace( '?', '%3F' ) + `" target="_blank" tabindex="0">
							<figure style="background: url('` + json.datasets['images-192'].uri + imgName + json.other.altSuffix + json.datasets['images-192'].extension + `') no-repeat scroll;">
								<img src="` + json.datasets['images-192'].uri + imgName + json.datasets['images-192'].extension + `" alt="[` + sName + ` icon]" title="` + fName + `"/>
								<figcaption>` + fName + `</figcaption>
							</figure>
						</a>`;

					grid.insertAdjacentHTML( 'beforeend', item );

					gameObjects[escape( fName.toLowerCase() )] = document.getElementById( u );

				/* SEARCH */

					var dataItem = `<option value="` + fName + `">`;
					searchData.insertAdjacentHTML( 'beforeend', dataItem );

					if ( rand >= 0 )
					{
						if ( rand == curr )
						{
							search.setAttribute( 'placeholder', fName );
							curr = -1;
						}
						else
						{
							curr++;
						}
					}

				}

			}

			search.addEventListener( 'input', function ( e )
			{
				var val = escape( this.value.toLowerCase() );
				if ( val == '' )
				{
					grid.classList.remove( 'searching' );
					for ( g in gameObjects )
					{
						if ( gameObjects.hasOwnProperty( g ) )
						{
							gameObjects[g].classList.remove( 'found' );
						}
					}
				}
				else
				{
					for ( g in gameObjects )
					{
						if ( gameObjects.hasOwnProperty( g ) )
						{
							if ( g.indexOf( val ) !== -1 )
							{
								gameObjects[g].classList.add( 'found' );
								gameObjects[g].setAttribute( 'tabindex', 1 );
							}
							else
							{
								gameObjects[g].classList.remove( 'found' );
								gameObjects[g].setAttribute( 'tabindex', -1 );
							}
						}
					}
					grid.classList.add( 'searching' );
				}
			} );

			/* LOAD PAGE */

			setTimeout( function ()
			{
				StartLoading()
			}, 200 );

		}
	).catch( ( err ) =>
	{
		console.log( err );
	} );
} );

function StartLoading()
{
	var hasResolved = false;

	setTimeout( function ()
	{
		if ( !hasResolved )
		{
			document.getElementById( 'Info' ).style.display = 'flex';
			document.getElementById( 'Games' ).style.display = 'flex';
			document.body.classList.add( 'loaded' );
		}
	}, 12000 );

	Promise.all( Array.from( document.images ).filter( img => !img.complete ).map( img => new Promise( resolve =>
	{
		img.addEventListener( 'load', resolve );
		img.addEventListener( 'error', resolve );
	} ) ) ).then( () =>
	{
		hasResolved = true;
		document.getElementById( 'Info' ).style.display = 'flex';
		document.getElementById( 'Games' ).style.display = 'flex';
		document.body.classList.add( 'loaded' );
	} );
}

// Smooth Scrolling

function scrollTo()
{
	const links = document.querySelectorAll( '.scroll' );
	links.forEach( each => ( each.onclick = scrollAnchors ) );
}

function scrollAnchors( e, respond = null )
{
	const distanceToTop = el => Math.floor( el.getBoundingClientRect().top );
	e.preventDefault();
	var targetID = ( respond ) ? respond.getAttribute( 'href' ) : this.getAttribute( 'href' );
	const targetAnchor = document.querySelector( targetID );
	if ( !targetAnchor ) return;
	const originalTop = distanceToTop( targetAnchor );
	window.scrollBy( { top: originalTop, left: 0, behavior: 'smooth' } );
	const checkIfDone = setInterval( function ()
	{
		const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2;
		if ( distanceToTop( targetAnchor ) === 0 || atBottom )
		{
			targetAnchor.tabIndex = '-1';
			targetAnchor.focus();
			window.history.pushState( '', '', targetID );
			clearInterval( checkIfDone );
		}
	}, 100 );
}