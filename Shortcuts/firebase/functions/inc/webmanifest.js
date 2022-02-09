const functions = require('firebase-functions');

module.exports = function(info, errors)
{
	if (Object.keys(errors).length === 0)
	{
		return `{
	"name": "` + info.fullName.replace( /&#x27;/g, "'" ) + `",
	"short_name": "` + info.shortName.replace( /&#x27;/g, "'" ) + `",
	"lang": "en-US",
	"start_url": "` + info.shortcutUrl + `",
	"scope": "/` + info.uid + `/",
	"display": "standalone",
	"theme_color": "#202124",
	"icons": [
		{
			"src": "` + info.images.image128 + `",
			"type": "image/png",
			"sizes": "128x128",
			"purpose": "any maskable"
		},
		{
			"src": "` + info.images.image192 + `",
			"type": "image/png",
			"sizes": "192x192",
			"purpose": "any"
		},
		{
			"src": "` + info.images.image512 + `",
			"type": "image/png",
			"sizes": "512x512",
			"purpose": "any"
		},
		{
			"src": "` + info.images.image + `",
			"type": "image/png",
			"sizes": "1024x1024",
			"purpose": "any"
		},
		{
			"src": "` + info.images.webp + `",
			"type": "image/webp",
			"sizes": "1024x1024",
			"purpose": "any"
		},
		{
			"src": "` + info.images.icon + `",
			"type": "image/x-icon",
			"sizes": "256x256 128x128 64x64 48x48 32x32 16x16"
		}
	],
	"background_color": "#202124",
	"related_applications": [
		{
			"platform": "play",
			"id": "com.google.stadia.android",
			"url": "https://play.google.com/store/apps/details?id=com.google.stadia.android"
		}
	],
	"prefer_related_applications": false
}`;
	}
	
	let output = require('./license.js') + `
<!DOCTYPE HTML>
<html lang="en">
	<head>
		<title class="lang" data-lang="error.head.title">StadiaIcons – Error &#8203;404&#8203;</title>
		<meta name="description" content="There was an error loading this page: Error 404, Page Not Found">
		<meta name="author" content="Eric Lowry">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">

		<link rel="icon" type="image/x-icon" sizes="16x16 32x32 48x48 64x64 128x128 256x256" href="https://raw.githubusercontent.com/ELowry/StadiaIcons/master/Icons/StadiaIcons.ico">
		<link rel="icon" type="image/png" sizes="128x128" href="https://raw.githubusercontent.com/ELowry/StadiaIcons/master/Images/128/StadiaIcons.png">
		<link rel="icon" type="image/png" sizes="192x192" href="https://raw.githubusercontent.com/ELowry/StadiaIcons/master/Images/192/StadiaIcons.png">
		<link rel="icon" type="image/png" sizes="512x512" href="https://raw.githubusercontent.com/ELowry/StadiaIcons/master/Images/512/StadiaIcons.png">
		<link rel="icon" type="image/png" sizes="1024x1024" href="https://raw.githubusercontent.com/ELowry/StadiaIcons/master/Images/StadiaIcons.png">
		<link rel="icon" type="image/webp" sizes="1024x1024" href="https://raw.githubusercontent.com/ELowry/StadiaIcons/master/WebP/StadiaIcons.webp">
		<link rel="apple-touch-icon" href="https://raw.githubusercontent.com/ELowry/StadiaIcons/master/Images/192/StadiaIcons.png">

		<script>
			var metaLang = {
				description: {
					tag: 'meta',
					attr: 'name',
					attrVal: 'description',
					targetAttr: 'content',
					path: 'error.head.description',
					props: ['404', {path:'error.codes.404'}]
				}
			},
			langDir = '../lang/';
		</script>
		<script src="/scripts/lang.js"></script>
		<script src="/scripts/coffee.js"></script>
		<link rel="stylesheet" href="/style.css">
	</head>
	<body class="translatable">
		<script>`;
		
	if (Object.keys(errors).length === 0)
	{
		output += '0';
	}
	else{
		output+= 'console.log(' + JSON.stringify(errors) + ')';
	}
		
	output += `</script>
		<main>
			<section id="Loading">
				<div class="loader"><div></div><div></div><div></div><div></div></div>
			</section>
			<section class="forced">
				<div>
					<h1><span class="lang" data-lang="error.title">Error &#8203;404&#8203;:</span> <span class="lang" data-lang="error.codes.404">Page Not Found</span></h1>
					<p class="lang" data-lang="error.cta">&#8203;<a href="/">&#8203;Click Here&#8203;</a>&#8203; to return to the home page.</p>
				</div>
			</section>
		</main>
		<footer>
			<p class="lang" data-lang="footer.copyright">Copyright © &#8203;2020&#8203; Eric Lowry. Licensed under &#8203;<a href="/LICENSE.txt">AGPL 3.0</a>&#8203;.</p>
			<p class="lang" data-lang="footer.links">Follow &#8203;<a href="https://github.com/ELowry/StadiaIcons/" target="_blank" rel="noreferrer noopener">&#8203;StadiaIcons on GitHub&#8203;</a>&#8203; | &#8203;<a href="/PRIVACY.html" target="_blank" rel="noreferrer noopener">&#8203;Privacy Policy&#8203;</a>&#8203;</p>
			<a class="coffee langTitle" data-langtitle="footer.coffeeTitleAttr" href="https://www.buymeacoffee.com/EricLowry" title="Send me tips using Buy me a Coffee!"><button tabindex="-1"><span>🥐 <span class="lang" data-lang="footer.coffee">Buy me a croissant</span></span><span id="coffee">❤</span></button></a>
		</footer>
	</body>
</html>`;
	
	return output;
}