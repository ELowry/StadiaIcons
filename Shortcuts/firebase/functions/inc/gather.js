const functions = require('firebase-functions');
const validator = require('validator');

module.exports = function ( request, hasGet, uid, params, refs )
{
	let data = {
		isValid: true,
		variantFound: false,
		shortcutUrl: null,
		webmanifestUrl: null,
		fullName: '',
		shortName: '',
		alt: '',
	};

	// Alt fallback

	if ( params.alt )
	{
		data.alt = refs.other.altSuffix;
	}

	// Uid fallback & storage

	data.uid = uid;

	if ( !refs.uids.hasOwnProperty( uid ) )
	{
		uid = Object.keys( refs.uids )[0];
		data.isValid = false;
	}

	data.imgID = uid;

	if ( hasGet )
	{
		data.fullName = params.fullName;
		data.shortName = params.shortName;

		data.shortcutUrl = request.protocol + '://' + request.headers['x-forwarded-host'] + '/' + data.uid + '/?fullName=' + encodeURIComponent( params.fullName ).replace( /&#x27;/g, '%27' ).replace( /&/g, '%26' ) + '&shortName=' + encodeURIComponent( params.shortName ).replace( /&#x27;/g, '%27' ).replace( /&/g, '%26' );
		data.webmanifestUrl = '/' + data.uid + '/stadia.webmanifest?fullName=' + encodeURIComponent( params.fullName ).replace( /&#x27;/g, '%27' ).replace( /&/g, '%26' ) + '&shortName=' + encodeURIComponent( params.shortName ).replace( /&#x27;/g, '%27' ).replace( /&/g, '%26' );

		if ( params.variant == 0 )
		{
			data.variantFound = true;
		}
		else if (
			params.variant
			&& Number.isInteger( params.variant )
			&& refs.uids[uid].hasOwnProperty( params.variant )
		)
		{
			data.shortcutUrl += '&variant=' + params.variant;
			data.webmanifestUrl += '&variant=' + params.variant;
			data.variantFound = true;
		}

		data.smallVariantIcons = {}
		for ( var k in refs.uids[uid] )
		{
			if ( refs.uids[uid].hasOwnProperty( k ) )
			{
				data.smallVariantIcons[k] = refs.datasets['images-128'].uri + encodeURIComponent( refs.uids[uid][k] ) + data.alt + refs.datasets['images-128'].extension;
			}
		}

		if ( params.alt )
		{
			data.shortcutUrl += '&alt=' + data.alt;
			data.webmanifestUrl += '&alt=' + data.alt;
		}
	}


	data.images = {
		icon: refs.datasets.icons.uri + encodeURIComponent( refs.uids[uid][params.variant] ) + data.alt + refs.datasets.icons.extension,
		image128: refs.datasets['images-128'].uri + encodeURIComponent( refs.uids[uid][params.variant] ) + data.alt + refs.datasets['images-128'].extension,
		image192: refs.datasets['images-192'].uri + encodeURIComponent( refs.uids[uid][params.variant] ) + data.alt + refs.datasets['images-192'].extension,
		image512: refs.datasets['images-512'].uri + encodeURIComponent( refs.uids[uid][params.variant] ) + data.alt + refs.datasets['images-512'].extension,
		image: refs.datasets.images.uri + encodeURIComponent( refs.uids[uid][params.variant] ) + data.alt + refs.datasets.images.extension,
		webp: refs.datasets.webp.uri + encodeURIComponent( refs.uids[uid][params.variant] ) + data.alt + refs.datasets.webp.extension
	}

	return data;
}