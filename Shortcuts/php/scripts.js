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
	
var inPWA = ( window.matchMedia( '(display-mode: standalone)' ).matches || window.matchMedia( '(display-mode: fullscreen)' ).matches || window.navigator.standalone === true ),
	isChrome = /Chrome/.test( navigator.userAgent ) && /Google Inc/.test( navigator.vendor );



// SET UP THE SERVICE WORKER

if ( "serviceWorker" in navigator )
{
	window.addEventListener( "load", () =>
	{
		navigator.serviceWorker.register( "/sw.js?uid=" + uid ).then( ( reg ) =>
		{
			console.log( 'ServiceWorker registration successful with scope: ', reg.scope );
		} ).catch( ( err ) =>
		{
			console.error( 'Service Worker Error', err );
		} );
	} );
}


window.addEventListener( 'load', function ()
{

	// POPUP ACCESS
	document.getElementById( 'TestAccess' ).addEventListener( 'click', ( e ) =>
	{
		location.reload( false );
		return false;
	} );

	// INSTALL PROMPT
	if ( inPWA )
	{
		document.getElementById( 'Alert' ).style.display = 'flex';

		var loadDelay = window.setTimeout( function ()
		{
			launchPup();
		}, 800 );

		document.addEventListener( 'keydown', ( e ) =>
		{
			if ( e.keyCode = 17 && loadDelay != null )
			{
				window.clearTimeout( loadDelay );
				loadDelay = null;
				ShowUninstall();
			}
		} );
	}
	else
	{
		var incompatibleDelay = window.setTimeout( function ()
		{
			ShowIncompatible();
		}, 1200 ),
			hasInstalled = false;

		let deferredPrompt;

		window.addEventListener( 'beforeinstallprompt', ( e ) =>
		{
			// Prevent the mini-infobar from appearing on mobile
			e.preventDefault();
			// Stash the event so it can be triggered later.
			deferredPrompt = e;
			// Update UI notify the user they can install the PWA
			ShowInstallPrompt();

			clearTimeout( incompatibleDelay );
		} );

		document.getElementById( 'InstallButton' ).addEventListener( 'click', ( e ) =>
		{
			e.preventDefault();

			// Hide the app provided install promotion
			ShowLoading();

			clearTimeout( incompatibleDelay );

			// Show the install prompt
			deferredPrompt.prompt();

			// Wait for the user to respond to the prompt
			deferredPrompt.userChoice.then( ( choiceResult ) =>
			{
				if ( choiceResult.outcome === 'accepted' )
				{
					if ( !hasInstalled ) 
					{
						hasInstalled = true;
						ShowInstalled();
					}
				}
				else
				{
					if ( !hasInstalled ) 
					{
						hasInstalled = false;
						ShowInstallPrompt();
					}
				}
			} );
		} );

		window.addEventListener( 'appinstalled', ( e ) =>
		{
			// Has installed
			if ( !hasInstalled ) 
			{
				hasInstalled = true;
				ShowInstalled();
			}
		} );
	}

	// LAUNCH Button

	var launchButtons = document.getElementsByClassName( 'LaunchGame' );
	for ( var i = 0; i < launchButtons.length; i++ )
	{
		launchButtons[i].addEventListener( 'click', ( e ) =>
		{
			launchPup();
		} );
	}

	// CLOSE ASIDE
	var launchButtons = document.getElementsByClassName( 'closeAside' );
	for ( var i = 0; i < launchButtons.length; i++ )
	{
		launchButtons[i].addEventListener( 'click', ( e ) =>
		{
			document.getElementById( 'Alert' ).style.display = 'none';
		} );
	}

} );

// POPUP LaunchGame

function launchPup()
{
	var gameWindow = window.open( 'https://stadia.google.com/player/' + uid, '_blank' );

	window.setTimeout( function ()
	{
		var hasRunCheck = false;
		try
		{
			if ( ( !gameWindow || gameWindow.closed || typeof gameWindow.closed == 'undefined' ) || ( isChrome && !gameWindow || gameWindow.outerHeight === 0 ) )
			{
				// Failure
				console.warn( 'The popup was blocked!' );

				ShowInstallPrompt(); // TODO: Make this a specific version for recurring blocked popups.

				hasRunCheck = true;
			} else
			{
				// Success
				window.close();

				hasRunCheck = true;
			}
		}
		catch ( err )
		{
			console.warn( err );

			if ( !gameWindow || gameWindow.closed || typeof gameWindow.closed == 'undefined' )
			{
				// Failure
				if ( !hasRunCheck )
				{
					console.warn( 'The popup was blocked!' );

					ShowInstallPrompt(); // TODO: Make this a specific version for recurring blocked popups.
				}
			} else
			{
				// Success
				if ( !hasRunCheck )
				{
					window.close();
				}
			}
		}
	}, 600 );
}

// POPUP TEST
function TestPopup()
{
	var popupTest = window.setTimeout( function ()
	{
		console.warn( "Popup Test Failed" );
		document.getElementById( 'PopupPrompt' ).style.display = 'flex';
		document.getElementById( 'Loading' ).className = '';
	}, 500 );

	window.addEventListener( "message", function ( e )
	{
		if ( e.origin == document.location.origin )
		{
			if ( e.data.loaded )
			{
				console.log( "Popup Test Successful" );
				clearTimeout( popupTest );
				document.getElementById( 'InstallPrompt' ).style.display = 'flex';
				document.getElementById( 'Loading' ).className = '';
			}
		}
	} );

	window.open( '/puptest.php', '_blank' );
}

// SECTION HANDLING

function ShowInstallPrompt()
{
	document.getElementById( 'InstallPrompt' ).style.display = 'none';
	document.getElementById( 'Loading' ).className = '';
	document.getElementById( 'Unavailable' ).style.display = 'none';

	TestPopup();
}
function ShowLoading()
{
	document.getElementById( 'Loading' ).className = 'show';
	document.getElementById( 'InstallPrompt' ).style.display = 'none';
	document.getElementById( 'Unavailable' ).style.display = 'none';
}
function ShowIncompatible()
{
	document.getElementById( 'Unavailable' ).style.display = 'flex';
	document.getElementById( 'Loading' ).className = '';
}
function ShowInstalled()
{
	document.getElementById( 'InstallPrompt' ).style.display = 'none';
	document.getElementById( 'Installed' ).style.display = 'flex';
	document.getElementById( 'Alert' ).style.display = 'flex';
	document.getElementById( 'Loading' ).className = '';
}
function ShowUninstall()
{
	document.getElementById( 'Uninstall' ).style.display = 'flex';
	document.getElementById( 'Alert' ).style.display = 'none';
	document.getElementById( 'Loading' ).className = '';
}