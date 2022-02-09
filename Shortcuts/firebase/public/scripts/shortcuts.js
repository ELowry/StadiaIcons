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

console.log('%cStadiaIcons Shortcuts', 'display: inline-block; margin: 0.4em 0.3em 0.1em; padding: 0.2em; border-radius: 0.2em; font-size: 2.2em; font-weight: 900; -webkit-linear-gradient(107deg,#ff4c1d,#9b0063); background: linear-gradient(107deg,#ff4c1d,#9b0063); font-family:"Google Sans","Product Sans","Roboto",sans-serif; color: #ffffff;')
console.log('%cHah, you found me!\nHere\'s a cookie— oh wait no, we don\'t use those; take a croissant instead: 🥐\nIf you\'re experiencing problems with StadiaIcons Shortcuts or are just curious about how things run, please check out the GitHub page:', 'display: inline-block; padding: 0.4em; background: #202124; border-radius: 0.1em; font-size: 1.2em; font-family:"Google Sans","Product Sans","Roboto",sans-serif; color: #d1293d;' );
console.log('%chttps://github.com/ELowry/StadiaIcons/', 'display: inline-block; padding: 0.4em; background: #202124; border-radius: 0.1em; font-size: 1.2em; font-family:"Google Sans","Product Sans","Roboto",sans-serif; font-weight: 600; color: #ff773d;' );
	
const inPWA = ( window.matchMedia( '(display-mode: standalone)' ).matches || window.matchMedia( '(display-mode: fullscreen)' ).matches || window.navigator.standalone === true ),
	isChromium = !!window.chrome && ( !!window.chrome.webstore || !!window.chrome.runtime ),
	isChrome = /Chrome/.test( navigator.userAgent ) && /Google Inc/.test( navigator.vendor );



// SET UP THE SERVICE WORKER

if ( "serviceWorker" in navigator )
{
	window.addEventListener( "load", () =>
	{
		navigator.serviceWorker.register( '/' + uid + "/sw.js?uid=" + uid ).then( ( reg ) =>
		{
			console.log('%cStadiaIcons', 'display: inline-block; padding: 0em 0.2em; font-size: 1.08em; border-radius: 0.2em; font-weight: 900; -webkit-linear-gradient(107deg,#ff4c1d,#9b0063); background: linear-gradient(107deg,#ff4c1d,#9b0063); font-family:"Google Sans","Product Sans","Roboto",sans-serif;', 'ServiceWorker registration successful with scope: ', reg.scope );
		} ).catch( ( err ) =>
		{
			console.error('%cStadiaIcons', 'display: inline-block; padding: 0em 0.2em; font-size: 1.08em; border-radius: 0.2em; font-weight: 900; -webkit-linear-gradient(107deg,#ff4c1d,#9b0063); background: linear-gradient(107deg,#ff4c1d,#9b0063); font-family:"Google Sans","Product Sans","Roboto",sans-serif;', 'Service Worker Error', err );
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

		let loadDelay = window.setTimeout( function ()
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
		const incompatibleDelay = window.setTimeout(
			function ()
			{
				ShowIncompatible();
			},
			2000
		),
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

	const launchButtons = document.getElementsByClassName( 'LaunchGame' );
	for ( let i = 0; i < launchButtons.length; i++ )
	{
		launchButtons[i].addEventListener( 'click', ( e ) =>
		{
			e.preventDefault();
			launchPup();
		} );
	}

	// ACCOUNT SELECTION

	const accountButton = document.getElementById( 'GoogleAccountSelect' ),
		accountSelectorDialog = this.document.getElementById( 'AccountSelector' ),
		closeAccountSelector = this.document.getElementsByClassName( 'closeAccountSelector' ),
		accountIDCookieConfirm = this.document.getElementById( 'AccountIDCookieConfirm' ),
		accountIDSelector = this.document.getElementById( 'AccountIDSelector' ),
		accountSelectorButton = this.document.getElementById( 'AccountSelectorButton' );
	if ( accountButton && accountSelectorDialog )
	{
		accountButton.addEventListener( 'click', ( e ) =>
		{
			e.preventDefault();
			accountSelectorDialog.style.display = 'flex';
		} );
		for ( let i = 0; i = closeAccountSelector.length; i++ )
		{
			closeAccountSelector[i].addEventListener( 'click', ( e ) =>
			{
				e.preventDefault();
				accountSelectorDialog.style.display = 'none';
			} );
		}
		accountSelectorButton.addEventListener( 'click', ( e ) =>
		{
			e.preventDefault();
			if ( accountIDCookieConfirm.checked )
			{
				StoreGoogleAccountValue( accountIDSelector.value );
			}
			accountSelectorDialog.style.display = 'none';
		} );
	}

	// CLOSE ASIDE
	const closeButtons = document.getElementsByClassName( 'closeAside' );
	for ( let i = 0; i < closeButtons.length; i++ )
	{
		closeButtons[i].addEventListener( 'click', ( e ) =>
		{
			e.preventDefault();
			document.getElementById( 'Alert' ).style.display = 'none';
		} );
	}
	
	// CLOSE WARNING
	const closeWarningButtons = document.getElementsByClassName( 'closeWarning' );
	for ( let i = 0; i < closeWarningButtons.length; i++ )
	{
		closeWarningButtons[i].addEventListener( 'click', ( e ) =>
		{
			e.preventDefault();
			document.getElementById( 'Warning' ).classList.add('hide');
		} );
	}

} );

// POPUP LaunchGame

function launchPup()
{
	const gameWindow = window.open( 'https://stadia.google.com/player/' + uid, '_blank', 'toolbar=0,location=0,menubar=0,status=0,resizable=1' );

	window.setTimeout( function ()
	{
		let hasRunCheck = false;
		try
		{
			if ( ( !gameWindow || gameWindow.closed || typeof gameWindow.closed == 'undefined' ) || ( isChrome && !gameWindow || gameWindow.outerHeight === 0 ) )
			{
				// Failure
				console.warn('%cStadiaIcons', 'display: inline-block; padding: 0em 0.2em; font-size: 1.08em; border-radius: 0.2em; font-weight: 900; -webkit-linear-gradient(107deg,#ff4c1d,#9b0063); background: linear-gradient(107deg,#ff4c1d,#9b0063); font-family:"Google Sans","Product Sans","Roboto",sans-serif;', 'The popup was blocked!' );

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
			console.warn('%cStadiaIcons', 'display: inline-block; padding: 0em 0.2em; font-size: 1.08em; border-radius: 0.2em; font-weight: 900; -webkit-linear-gradient(107deg,#ff4c1d,#9b0063); background: linear-gradient(107deg,#ff4c1d,#9b0063); font-family:"Google Sans","Product Sans","Roboto",sans-serif;', err );
			
			if ( !gameWindow || gameWindow.closed || typeof gameWindow.closed == 'undefined' )
			{
				// Failure
				if ( !hasRunCheck )
				{
					console.warn('%cStadiaIcons', 'display: inline-block; padding: 0em 0.2em; font-size: 1.08em; border-radius: 0.2em; font-weight: 900; -webkit-linear-gradient(107deg,#ff4c1d,#9b0063); background: linear-gradient(107deg,#ff4c1d,#9b0063); font-family:"Google Sans","Product Sans","Roboto",sans-serif;', 'The popup was blocked!' );

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
	const popupTest = window.setTimeout( function ()
	{
		console.warn('%cStadiaIcons', 'display: inline-block; padding: 0em 0.2em; font-size: 1.08em; border-radius: 0.2em; font-weight: 900; -webkit-linear-gradient(107deg,#ff4c1d,#9b0063); background: linear-gradient(107deg,#ff4c1d,#9b0063); font-family:"Google Sans","Product Sans","Roboto",sans-serif;', "Popup Test Failed" );
		document.getElementById( 'PopupPrompt' ).style.display = 'flex';
		document.getElementById( 'Loading' ).className = '';
	}, 500 );

	window.addEventListener( "message", function ( e )
	{
		if ( e.origin == document.location.origin )
		{
			if ( e.data.loaded )
			{
				console.log('%cStadiaIcons', 'display: inline-block; padding: 0em 0.2em; font-size: 1.08em; border-radius: 0.2em; font-weight: 900; -webkit-linear-gradient(107deg,#ff4c1d,#9b0063); background: linear-gradient(107deg,#ff4c1d,#9b0063); font-family:"Google Sans","Product Sans","Roboto",sans-serif;', "Popup Test Successful" );
				clearTimeout( popupTest );
				document.getElementById( 'InstallPrompt' ).style.display = 'flex';
				document.getElementById( 'Loading' ).className = '';
			}
		}
	} );

	window.open( '/puptest.html', '_blank', 'toolbar=0,location=0,menubar=0,status=0,resizable=1,fullscreen=1' );
	window.focus();
}

// GOOGLE ACCOUNT

function GetGoogleAccount()
{
	const accountNumber = GetGoogleAccountValue();
	if ( accountNumber > 1 )
	{
		return '/u/' + accountNumber;
	}
	return '';
}
function GetGoogleAccountValue()
{
	const accountNumber = GetCookie( 'AccountNumber' );
	if ( !isNaN( accountNumber ) && accountNumber > 1 && accountNumber <= 10 )
	{
		StoreGoogleAccountValue( accountNumber ); // The cookie is stored again in order to reset the expiration.
		return accountNumber;
	}
	return 1;
}
function StoreGoogleAccountValue( accountNumber )
{
	if ( !isNaN( accountNumber ) && accountNumber > 1 && accountNumber <= 10 )
	{
		document.cookie.set( {
			name: 'AccountNumber',
			path: '/',
			value: accountNumber,
			secure: true,
			expires: (Date.now() / 1000) + 31536000
		} );
	}
	else
	{
		document.cookie.set( {
			name: 'AccountNumber',
			path: '/',
			value: 1,
			secure: true,
			expires: 0
		} );
	}
}

function GetCookie( cname )
{
	let name = cname + "=";
	let decodedCookie = decodeURIComponent( document.cookie );
	let ca = decodedCookie.split( ';' );
	for ( let i = 0; i < ca.length; i++ )
	{
		let c = ca[i];
		while ( c.charAt( 0 ) == ' ' )
		{
			c = c.substring( 1 );
		}
		if ( c.indexOf( name ) == 0 )
		{
			return c.substring( name.length, c.length );
		}
	}
	return "";
}

// SECTION HANDLING

function ShowInstallPrompt()
{
	document.getElementById( 'InstallPrompt' ).style.display = 'none';
	document.getElementById( 'Unavailable' ).style.display = 'none';
	document.getElementById( 'Exists' ).style.display = 'none';
	document.body.classList.add( 'loaded' );

	TestPopup();
}
function ShowLoading()
{
	document.body.classList.remove( 'loaded' );
	document.getElementById( 'InstallPrompt' ).style.display = 'none';
	document.getElementById( 'Unavailable' ).style.display = 'none';
	document.getElementById( 'Exists' ).style.display = 'none';
}
function ShowIncompatible()
{
	document.getElementById( 'InstallPrompt' ).style.display = 'none';
	if ( isChromium )
	{
		document.getElementById( 'Unavailable' ).style.display = 'none';
		document.getElementById( 'Exists' ).style.display = 'flex';
	}
	else
	{
		document.getElementById( 'Exists' ).style.display = 'none';
		document.getElementById( 'Unavailable' ).style.display = 'flex';
	}
	document.body.classList.add( 'loaded' );
}
function ShowInstalled()
{
	document.getElementById( 'InstallPrompt' ).style.display = 'none';
	document.getElementById( 'Installed' ).style.display = 'flex';
	document.getElementById( 'Alert' ).style.display = 'flex';
	document.body.classList.add( 'loaded' );
}
function ShowUninstall()
{
	document.getElementById( 'Uninstall' ).style.display = 'flex';
	document.getElementById( 'Alert' ).style.display = 'none';
	document.body.classList.add( 'loaded' );
}