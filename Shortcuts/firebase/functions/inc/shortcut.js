const functions = require('firebase-functions');

module.exports = function(info, errors)
{
	var output = require('./license.js'),
		iconWarn = '';
	if (!info.isValid)
	{
		iconWarn = ' class="display"';
	}
	if (Object.keys(errors).length === 0)
	{
		output += `
<!DOCTYPE HTML>
<meta charset="UTF-8">
<html lang="en">
	<head>
		<title class="lang" data-lang="meta.title">StadiaIcons – &#8203;` + info.fullName + `&#8203; – Shortcut</title>
		<meta name="description" content="This page will allow you to install ` + info.fullName + ` as a Progressive Web App with its corresponding StadiaIcon.">
		<meta name="keywords" content="Stadia, Icons, Design, Gaming, Game, Shortcut, ` + info.shortName + `">
		<meta name="author" content="Eric Lowry">
		
		<link rel="manifest" href="` + info.webmanifestUrl + `">
		
		<meta name="mobile-web-app-capable" content="yes">
		<meta name="apple-mobile-web-app-capable" content="yes">
		<meta name="application-name" content="` + info.fullName + `">
		<meta name="apple-mobile-web-app-title" content="` + info.shortName + `">
		<meta name="theme-color" content="#202124">
		<meta name="msapplication-navbutton-color" content="#202124">
		<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
		<meta name="msapplication-starturl" content="` + info.shortcutUrl + `">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
		<meta name="theme-color" content="#202124">

		<link rel="icon" type="image/x-icon" sizes="16x16 32x32 48x48 64x64 128x128 256x256" href="` + info.images.icon + `">
		<link rel="icon" type="image/png" sizes="128x128" href="` + info.images.image128 + `">
		<link rel="icon" type="image/png" sizes="192x192" href="` + info.images.image192 + `">
		<link rel="icon" type="image/png" sizes="512x512" href="` + info.images.image512 + `">
		<link rel="icon" type="image/png" sizes="1024x1024" href="` + info.images.image + `">
		<link rel="icon" type="image/webp" sizes="1024x1024" href="` + info.images.webp + `">
		<link rel="apple-touch-icon" href="` + info.images.image192 + `">
		
		<meta property="og:title" content="` + info.shortName + ` shortcut">
		<meta property="og:site_name" content="StadiaIcons Shortcuts">
		<meta property="og:url" content="https://stadiaicons.web.app">
		<meta property="og:description" content="This page will allow you to install ` + info.fullName + ` as a Progressive Web App with its corresponding StadiaIcon.">
		<meta property="og:type" content="website">
		<meta property="og:image" content="` + info.images.webp + `">
		<meta property="og:image" content="` + info.images.image + `">
		<meta property="og:image" content="https://raw.githubusercontent.com/ELowry/StadiaIcons/master/Header.png">
		<meta property="og:image" content="` + info.images.image512 + `">
		<meta property="og:image" content="` + info.images.image192 + `">
		<meta property="og:image" content="` + info.images.image128 + `">
		
		<meta name="twitter:card" content="summary_large_image">
		<meta name="twitter:site" content="@EricLowry14">
		<meta name="twitter:description" content="This page will allow you to install ` + info.fullName + ` as a Progressive Web App with its corresponding StadiaIcon.">
		<meta name="twitter:title" content="StadiaIcons – ` + info.fullName + ` – Shortcut">
		<meta name="twitter:image" content="https://raw.githubusercontent.com/ELowry/StadiaIcons/master/Header.png">
		
		<link rel="stylesheet" href="/style.css">
		
		<script>
			var metaLang = {
				ogTitle: {
					tag: 'meta',
					attr: 'property',
					attrVal: 'og:title',
					targetAttr: 'content',
					path: 'meta.title',
					props: ['` + info.fullName + `']
				},
				twitterTitle: {
					tag: 'meta',
					attr: 'property',
					attrVal: 'twitter:title',
					targetAttr: 'content',
					path: 'meta.simpleTitle',
					props: ['` + info.fullName + `']
				},
				description: {
					tag: 'meta',
					attr: 'name',
					attrVal: 'description',
					targetAttr: 'content',
					path: 'meta.description',
					props: ['` + info.fullName + `']
				},
				ogDescription: {
					tag: 'meta',
					attr: 'property',
					attrVal: 'og:description',
					targetAttr: 'content',
					path: 'meta.description',
					props: ['` + info.fullName + `']
				},
				twitterDescription: {
					tag: 'meta',
					attr: 'property',
					attrVal: 'twitter:description',
					targetAttr: 'content',
					path: 'meta.description',
					props: ['` + info.fullName + `']
				},
				keywords: {
					tag: 'meta',
					attr: 'name',
					attrVal: 'keywords',
					targetAttr: 'content',
					path: 'meta.keywords',
					props: [', ` + info.fullName + `']
				}
			},
				uid = '` + info.uid + `',
				langDir = '../lang/';
		</script>
		<script src="/scripts/lang.js"></script>
		<script src="/` + info.uid + `/shortcuts.js"></script>
	</head>
	<body class="translatable loadable">
		<script>0</script>
		<main>
			<section id="Loading">
				<div class="loader"><div></div><div></div><div></div><div></div></div>
			</section>
			<section id="Installed">
				<div>
					<h1 class="lang" data-lang="main.installed.title">Installation Successful</h1>
					<p class="lang" data-lang="main.installed.info">You should now be able to open &#8203;` + info.fullName + `&#8203; directly from your Desktop or Start Menu.</p>
					<p style="padding-top: 2vw;"><button class="LaunchGame"><span class="lang" data-lang="main.installed.button">Launch &#8203;` + info.fullName + `&#8203; Now</span></button></a></p>
				</div>
			</section>
			<section id="InstallPrompt">
				<div>
					<h1><span class="gradient">StadiaIcons</span> Shortcuts</h1>
					<h2>` + info.fullName + `</h2>
						<picture id="IconPreview">
							<source  srcset ="` + info.images.image128 + `" media="(max-width:426px), (max-height: 232px)" />
							<source  srcset ="` + info.images.image192 + `" media="(max-width:640px), (max-height: 249px)" />
							<source  srcset="` + info.images.image512 + `" media="(max-width:1706px), (max-height: 930px)" />
							<source  srcset="` + info.images.webp + `, ` + info.images.image + `" media="(min-width: 1707px) and (min-height: 931px)" />
							<img src="` + info.images.image192 + `" alt="` + info.fullName + ` Game Icon" />
						</picture>
					<p>
						<a class="button" href="/` + info.uid + `/?fullName=` + info.fullName + `&shortName=` + info.shortName + `&alt=` + ( info.alt == '' ).toString() + `">
							<button class="outline" tabindex="-1"><span class="lang" data-lang="main.installPrompt.toggle">&#8203;<span class="buttonIcon">⇆</span>&#8203;Switch Style</span></button>
						</a>
					</p>
					<p>
						<a class="button" id="InstallButton" href="https://stadia.google.com/player/` + info.uid + `">
							<button tabindex="-1"><span class="lang" data-lang="main.installPrompt.prompt">Create a shortcut on your device.</span></button>
						</a>
					</p>
					<div id="IconVariants">
						<h3>Variants:</h3>
						`;

		for ( k in info.smallVariantIcons )
		{
			if ( info.smallVariantIcons.hasOwnProperty( k ) )
			{
				if ( info.smallVariantIcons[k] == info.images.image128 )
				{
					output += `<img class="current" src="` + info.smallVariantIcons[k] + `" alt="` + info.shortName + ` variant ` + k + `" />
						`;
				}
				else
				{
					output += `<a href="/` + info.uid + `/?fullName=` + info.fullName + `&shortName=` + info.shortName + `&alt=` + ( info.alt != '' ).toString() + `&variant=` + k + `">
							<img src="` + info.smallVariantIcons[k] + `" alt="` + info.shortName + ` variant ` + k + `" />
						</a>
						`;
				}
			}
		}
		
		output += `
					</div>
				</div>
				<div id="Warning"` + iconWarn + `>
					<div>
						<span class="close closeWarning">×</span>
						<h2 class="lang" data-lang="main.installPrompt.warningTitle">IMPORTANT</h2>
						<p class="lang" data-lang="main.installPrompt.warning1">Unfortunately the icons for this game is not yet available.</p>
						<p class="lang" data-lang="main.installPrompt.warning2">You can still install the shortcut, but it will have a default icon for the time being.</p>
						<span class="closeWarning">
							<button>
								<span class="lang" data-lang="main.installPrompt.warningButton">I Understand</span>
							</button>
						</span>
					</div>
				</div>
			</section>
			<section id="PopupPrompt">
				<div>
					<h1><span class="gradient">StadiaIcons</span> Shortcuts</h1>
					<h2 class="lang" data-lang="main.popupPrompt.title">First Installation</h2>
					<div class="inset">
						<p class="lang" data-lang="main.popupPrompt.inset1">This is the first time you are installing a StadiaIcon shortcut.</p>
						<p class="lang" data-lang="main.popupPrompt.inset2">In order to create shortcuts, you must authorize this website to display popup windows*.</p>
						<p class="lang" data-lang="main.popupPrompt.inset3">Depending on your browser, you should see a message requesting this authorization. It is typically to the right of the address bar.</p>
					</div>
					<p class="lang" data-lang="main.popupPrompt.request">If you do not see this message or once you have given authorization, please press this button:</p>
					<p style="padding-top: 2vw;"><button id="TestAccess"><span class="lang" data-lang="main.popupPrompt.button">Test Popup Access</span></button></p>
				</div>
				<div class="footnote">
					<p class="lang" data-lang="main.popupPrompt.footnote">* StadiaIcon shortcuts use Progressive Web Apps, and in order to open your game without the address bar at the top, the app instead opens the game in a regular browser tab using a popup and immediately closes in the background.</p>
				</div>
			</section>
			<section id="Uninstall">
				<div>
					<h1><span class="gradient">StadiaIcons</span> Shortcut <span class="lang" data-lang="main.uninstall.stopped">Stopped</span></h1>
					<p class="lang" data-lang="main.uninstall.info">You pressed the &#8203;<span class="hilight">Ctrl</span>&#8203; key while the shortcut was launching.</p>
					<p class="lang" data-lang="main.uninstall.uninstall">You may be trying to uninstall this shortcut. If that is the case, you should find an <em>uninstall</em> button in this window's settings. This menu is typically located in the top right.</p>
					<p class="lang" data-lang="main.uninstall.restart">If not, you can simply press this button to start your game:</a>
					<p style="padding-top: 2vw;"><button class="LaunchGame"><span class="lang" data-lang="main.uninstall.button">Launch &#8203;` + info.fullName + `&#8203;</span></button></a></p>
				</div>
			</section>
			<section id="Exists">
				<div>
					<h1><span class="gradient">StadiaIcons</span> Shortcuts – <span class="lang" data-lang="generic.warning">Warning</span></h1>
					<h2 class="lang" data-lang="main.exists.status">The shortcut may already be installed</h2>
					<p class="lang" data-lang="main.exists.info">If you have already installed the &#8203;` + info.fullName + `&#8203; &#8203;<span class="gradient">StadiaIcons</span>&#8203; shortcut, you no longer need to access this link; simply use the installed shortcut to play your game!</p>
					<p class="lang" data-lang="main.exists.fallback">Otherwise, something didn't go as planned; we suggest you reload this page to see if things get fixed.</p>
				</div>
			</section>
			<section id="Unavailable">
				<div>
					<h1><span class="gradient">StadiaIcons</span> Shortcuts – <span class="lang" data-lang="generic.error">Error</span></h1>
					<h2 class="lang" data-lang="main.unavailable.status">Your browser may not be supported</h2>
					<p class="lang" data-lang="main.unavailable.browsers">We strongly recommend using &#8203;<a href="https://google.com/chrome" title="&#8203;Download Chrome&#8203;" target="_blank" rel="noreferrer noopener">Chrome</a>&#8203; or &#8203;<a href="https://microsoft.com/edge" title="&#8203;Download Edge&#8203;" target="_blank" rel="noreferrer noopener">Chromium Edge</a>&#8203;.</p>
				</div>
			</section>
			<aside id="Alert">
					<h2 class="lang" data-lang="generic.important">IMPORTANT</h2>
					<p class="lang" data-lang="main.alert.info">To uninstall this shortcut, please press the &#8203;<span class="hilight">Ctrl</span>&#8203; key as the shortcut launches.</p>
					<span class="close closeAside">×</span>
			</aside>
		</main>
		<footer>
			<p class="lang" data-lang="footer.copyright">Copyright © &#8203;2020&#8203; Eric Lowry. Licensed under &#8203;<a href="/LICENSE.txt">AGPL 3.0</a>&#8203;.</p>
			<p class="lang" data-lang="footer.links">Follow &#8203;<a href="https://github.com/ELowry/StadiaIcons/" target="_blank" rel="noreferrer noopener">&#8203;StadiaIcons on GitHub&#8203;</a>&#8203; | &#8203;<a href="/PRIVACY.html" target="_blank" rel="noreferrer noopener">&#8203;Privacy Policy&#8203;</a>&#8203;</p>
		</footer>
	</body>
</html>`;
	}
	else
	{
		output += `
<!DOCTYPE HTML>
<meta charset="UTF-8">
<html lang="en">
	<head>
		<title class="lang" data-lang="error.head.simpleTitle">StadiaIcons – Error</title>
		<meta name="description" content="There was an error processing your StadiaIcons request.>
		<meta name="keywords" content="Icons, Design, Gaming, Game, Shortcut, ` + info.shortName + `">
		<meta name="author" content="Eric Lowry">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		
		<link rel="icon" type="image/x-icon" sizes="16x16 32x32 48x48 64x64 128x128 256x256" href="` + info.images.icon + `">
		<link rel="icon" type="image/png" sizes="128x128" href="` + info.images.image128 + `">
		<link rel="icon" type="image/png" sizes="192x192" href="` + info.images.image192 + `">
		<link rel="icon" type="image/png" sizes="512x512" href="` + info.images.image512 + `">
		<link rel="icon" type="image/png" sizes="1024x1024" href="` + info.images.image + `">
		<link rel="icon" type="image/webp" sizes="1024x1024" href="` + info.images.webp + `">
		<link rel="apple-touch-icon" href="` + info.images.image192 + `">
		
		<script>
			var metaLang = {
				description: {
					tag: 'meta',
					attr: 'name',
					attrVal: 'description',
					targetAttr: 'content',
					path: 'error.description',
					props: ['StadiaIcons']
				},
				keywords: {
					tag: 'meta',
					attr: 'name',
					attrVal: 'keywords',
					targetAttr: 'content',
					path: 'meta.keywords',
					props: [', ` + info.fullName + `']
				}
			};
		</script>
		<script src="/scripts/lang.js"></script>
		<link rel="stylesheet" href="/style.css">
	</head>
	<body class="translatable">
		<script>`;
		
		if (Object.keys(errors).length === 0)
		{
			output += '0';
		}
		else{
			output+= "console.warn('%cStadiaIcons', 'display: inline-block; padding: 0em 0.2em; font-size: 1.08em; border-radius: 0.2em; font-weight: 900; -webkit-linear-gradient(107deg,#ff4c1d,#9b0063); background: linear-gradient(107deg,#ff4c1d,#9b0063); font-family:\"Google Sans\",\"Product Sans\",\"Roboto\",sans-serif;', 'ERRORS: '," + JSON.stringify(errors) + ')';
		}
			
		output += `</script>
		<script src="/scripts/lang.js"></script>
		<main>
			<section id="Loading">
				<div class="loader"><div></div><div></div><div></div><div></div></div>
			</section>
			<section style="display: flex;">
				<div>
					<h1 class="lang" data-lang="error.description">There was an error processing your &#8203;<span class="gradient">StadiaIcons</span>&#8203; request.</h1>
					<p class="lang" data-lang="error.instructions">Please close this page and try again. If the problem persists, please contact us on Reddit at &#8203;<a href="https://reddit.com/user/EricLowry" target="_blank" rel="noreferrer noopener">u/EricLowry</a>&#8203; or on &#8203;<a href="https://github.com/ELowry/StadiaIcons/" target="_blank" rel="noreferrer noopener">GitHub</a>&#8203;.</p>
				</div>
			</section>
		</main>
		<footer>
			<p class="lang" data-lang="footer.copyright">Copyright © &#8203;2020&#8203; Eric Lowry. Licensed under &#8203;<a href="/LICENSE.txt">AGPL 3.0</a>&#8203;.</p>
			<p class="lang" data-lang="footer.links">Follow &#8203;<a href="https://github.com/ELowry/StadiaIcons/" target="_blank" rel="noreferrer noopener">&#8203;StadiaIcons on GitHub&#8203;</a>&#8203; | &#8203;<a href="/PRIVACY.html" target="_blank" rel="noreferrer noopener">&#8203;Privacy Policy&#8203;</a>&#8203;</p>
			<a href="https://www.buymeacoffee.com/EricLowry"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a croissant&emoji=🥐&slug=EricLowry&button_colour=d12947&font_colour=ffffff&font_family=Lato&outline_colour=ffffff&coffee_colour=FFDD00"></a>
		</footer>
	</body>
</html>`;
	}
	
	return output;
}