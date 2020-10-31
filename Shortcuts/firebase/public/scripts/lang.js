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
	
// Language Directory Fallback

if(typeof langDir === 'undefined')
{
	var langDir = '../lang/';
}


window.addEventListener( 'load', function ()
{

	// LANGUAGE DETECTION
		
	var langs = navigator.languages;
	if (!langs || !Array.isArray(langs) || langs.length <= 0)
	{
		if (navigator.language)
		{
			langs = [navigator.language]
		}
		else if (navigator.userLanguage)
		{
			langs = [navigator.userLanguage];
		}
		else
		{
			langs = [en_us];
		}
	}
	
	
	// CLEAN UP
	
	langs = langs.map((x) => {
		var y = x.split(/[-_]/);
		if (y.length <= 1)
		{
			return y[0].toLowerCase();
		}
		return y[0].toLowerCase() + '_' + y[1].toUpperCase();
	});
	
	
	
	// FIND EXISTING & POSSIBLES
	
	fetch (langDir + 'langs.json').then (
		response => response.json()
	).then (
		(json) => {
			
			var lang = null,
				possibles = [],
				langGet = window.location.search.match(/[\?&]lang=([a-zA-Z]{2}(?:[- _][a-zA-Z]{1,2})?)/);
				
			if (langGet && langGet.length > 0)
			{
				lang = langGet[1];
			}
			
			if(lang)
			{
				lang = verifyLang(lang, json, possibles);
			}
			
			if (lang === null)
			{
				for (code in langs)
				{
					var result = verifyLang(langs[code], json, possibles);
					if(result)
					{
						lang = result;
						break;
					}
				}
			}
			
			if (!lang)
			{
				if (possibles.length > 0)
				{
					lang = json[possibles][0];
				}
				else
				{
					lang = 'en_us';
				}
			}
			
			GrabLanguage(lang, lang.split('_')[0]);
			
		}
	).catch ((err) => {
		console.error('%cStadiaIcons', 'display: inline-block; padding: 0em 0.2em; font-size: 1.08em; border-radius: 0.2em; font-weight: 900; -webkit-linear-gradient(107deg,#ff4c1d,#9b0063); background: linear-gradient(107deg,#ff4c1d,#9b0063); font-family:"Google Sans","Product Sans","Roboto",sans-serif;', err);
	});
	
});


// FETCH THE LANGUAGE FILE

function GrabLanguage(lang, prefix)
{
	fetch (langDir + lang + '.json').then (
		response => response.json()
	).then (
		(json) => {
			
			if (json.hasOwnProperty('translator'))
			{
				var thanksTranslator = 'Thank you ' + json.translator + ' for the translation!!!!!';
				console.log('%cStadiaIcons', 'display: inline-block; padding: 0em 0.2em; font-size: 1.08em; border-radius: 0.2em; font-weight: 900; -webkit-linear-gradient(107deg,#ff4c1d,#9b0063); background: linear-gradient(107deg,#ff4c1d,#9b0063); font-family:"Google Sans","Product Sans","Roboto",sans-serif;', thanksTranslator);
			}
			
			document.documentElement.lang = prefix;
			
			TranslateMeta(json);
			
			TranslateHtml(json);
			
			document.body.classList.add('translated');
			
		}
	).catch ((err) => {
		console.error('%cStadiaIcons', 'display: inline-block; padding: 0em 0.2em; font-size: 1.08em; border-radius: 0.2em; font-weight: 900; -webkit-linear-gradient(107deg,#ff4c1d,#9b0063); background: linear-gradient(107deg,#ff4c1d,#9b0063); font-family:"Google Sans","Product Sans","Roboto",sans-serif;', err);
	});
}


// TRANSLATION

// Translating Meta Tags

function TranslateMeta(data)
{
	if (typeof metaLang !== 'undefined' && metaLang)
	{
		for (m in metaLang)
		{
			var elems = document.getElementsByTagName(metaLang[m].tag);
			
			for (e in elems)
			{
				if (!isNaN(e) && elems[e].hasAttribute(metaLang[m].attr))
				{
					if (elems[e].getAttribute(metaLang[m].attr) === metaLang[m].attrVal)
					{
						var target = GetLangString(metaLang[m].path, data);
						
						if (target)
						{
							if (metaLang[m].hasOwnProperty('props'))
							{
								var props = [];
								for (p in metaLang[m].props)
								{
									if (typeof metaLang[m].props[p] === 'object')
									{
										props.push(GetLangString(metaLang[m].props[p].path, data));
									}
									else
									{
										props.push(metaLang[m].props[p]);
									}
								}
								
								elems[e].setAttribute(metaLang[m].targetAttr, target.format(props));
							}
							else
							{
								elems[e].setAttribute(metaLang[m].targetAttr, target);
							}
						}
						else
						{
							console.log('%cStadiaIcons', 'display: inline-block; padding: 0em 0.2em; font-size: 1.08em; border-radius: 0.2em; font-weight: 900; -webkit-linear-gradient(107deg,#ff4c1d,#9b0063); background: linear-gradient(107deg,#ff4c1d,#9b0063); font-family:"Google Sans","Product Sans","Roboto",sans-serif;', 'Translation Error: target not found for ', metaLang[m]);
						}
					}
				}
			}
		}
	}
}


// Treanslating HTML Contents

function TranslateHtml(data)
{
	var objs = document.getElementsByClassName('lang');
	
	for (var i = 0; i < objs.length; i++)
	{
		var elems = objs[i].innerHTML.match(/\u200B([^\u200B]+)\u200B/g),
			target = GetLangString(objs[i].dataset.lang, data);
		
		if (target)
		{
			if (elems && elems.length > 0)
			{
				//console.log('%cStadiaIcons', 'display: inline-block; padding: 0em 0.2em; font-size: 1.08em; border-radius: 0.2em; font-weight: 900; -webkit-linear-gradient(107deg,#ff4c1d,#9b0063); background: linear-gradient(107deg,#ff4c1d,#9b0063); font-family:"Google Sans","Product Sans","Roboto",sans-serif;', 'Translation Error: target not found for ', 'Translating {', objs[i].innerHTML, '} into {', target.format(elems), '} using these elements: ', elems);
				objs[i].innerHTML = target.format(elems);
			}
			else
			{
				//console.log('%cStadiaIcons', 'display: inline-block; padding: 0em 0.2em; font-size: 1.08em; border-radius: 0.2em; font-weight: 900; -webkit-linear-gradient(107deg,#ff4c1d,#9b0063); background: linear-gradient(107deg,#ff4c1d,#9b0063); font-family:"Google Sans","Product Sans","Roboto",sans-serif;', 'Translation Error: target not found for ', 'Translating {', objs[i].innerHTML, '} into {', target, '}.');
				objs[i].innerHTML = target;
			}
		}
		else
		{
			console.log('%cStadiaIcons', 'display: inline-block; padding: 0em 0.2em; font-size: 1.08em; border-radius: 0.2em; font-weight: 900; -webkit-linear-gradient(107deg,#ff4c1d,#9b0063); background: linear-gradient(107deg,#ff4c1d,#9b0063); font-family:"Google Sans","Product Sans","Roboto",sans-serif;', 'Translation Error: target not found for ', objs[i]);
		}
	}
}


// TOOLS

function verifyLang(verif, langs, possibles)
{
	var verif = verif.split(/[-_]/),
		prefix = verif[0].toLowerCase();
	
	if (verif.length <= 1)
	{
		if (langs.hasOwnProperty(prefix))
		{
			possibles.push(prefix);
		}
		return false;
	}
	
	var suffix = verif[1].toUpperCase();
	
	verif = prefix + '_' + suffix;
	
	if (!langs.hasOwnProperty(prefix) || !langs[prefix].includes(verif))
	{
		return null;
	}
	for (code in langs[prefix])
	{
		if (langs[prefix][code] === verif)
		{
			return verif;
		}
	}
	
	possibles.push(prefix);
	
	return false;
}

function GetLangString(pathString, data)
{
	var path = pathString.split('.'),
		target = data;
	
	for (p in path)
	{
		target = target[path[p]];
	}
	return target;
}


// EXTENSIONS

if (!String.prototype.format)
{
	String.prototype.format = function(format)
	{
		var args = arguments;
		if (Array.isArray(args[0]))
		{
			args = args[0];
		}
		return this.replace(/{(\d+)}/g, function(match, number)
		{
			return typeof args[number] != 'undefined' ? args[number] : match;
		});
	}
}