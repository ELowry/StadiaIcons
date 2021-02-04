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
	
	var output = require('./license.js') + `
<!DOCTYPE HTML>
<html lang="en">
	<head>
		<title>StadiaIcons – Error 404 ?></title>
		<meta name="description" content="There was an error loading this page: error 404, Page Not Found">
		<meta name="author" content="Eric Lowry">
		<meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
		
		<link rel="stylesheet" href="/style.css">
	</head>
	<body>
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
			<section class="forced">
				<div>
					<h1>Error 404: Page Not Found</h1>
					<p><a href="/">Click Here</a> to return to the home page.</p>
				</div>
			</section>
		</main>
		<footer>
			<p>Copyright © 2020 Eric Lowry. Licensed under <a href="/LICENSE.txt">AGPL 3.0</a>.</p>
			<p>Follow <a href="https://github.com/ELowry/StadiaIcons/" target="_blank" rel="noreferrer noopener">StadiaIcons on GitHub</a></p>
			<a href="https://www.buymeacoffee.com/EricLowry"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a croissant&emoji=🥐&slug=EricLowry&button_colour=d12947&font_colour=ffffff&font_family=Lato&outline_colour=ffffff&coffee_colour=FFDD00"></a>
		</footer>
	</body>
</html>`;
	
	return output;
}