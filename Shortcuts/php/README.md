# StadiaIcons Shortcuts PHP version

This version is designed to be deployed on the web using PHP server-side and the typical HTML/JavaScript/CSS combo client-side.

## WARNING

***This version is still functional, but no longer actively maintained. I strongly suggest checking all the code for errors or vulnerabilities before deploying it yourself just in case.***

## Usage

In order to call a StadiaIcons Shortcut for a given Stadia title, the following link structure will be able to dynamically generate a functional Progressive Web App (PWA):

https://<span></span>yourdomain<span></span>.com/`{uid}`/?fullName=`{title}`&uid=`{uid}`&shortName=`{short tite}`&alt=`{alt marker}`&variant=`{variant id}`&lang=`{language}`

***Parameters:***
* `{uid}`: The game's unique uid, which is found in the game's Stadia launch url and is used to identify it in the StadiaIcons [refs.json](/refs.json) reference sheet.
* `{title}`: The game's title.
* `{short tite}`: *(optional)* A shorter version of the title that will be used as the shortcut name in some cases (this can be useful with games that have huge titles that couldn't be displayed in most UIs).
* `{alt marker}`: *(optional)* If set to the `altSuffix` value found in the StadiaIcons [refs.json](/refs.json) reference sheet (`_alt` by default), the icon used for the PWA will not have the red filter.
* `{variant id}`: *(optional)* In the case where a game has multiple icon variants, this `int` value will be used to determine which version to use (defaults to `0`).
* `{language}`: *(optional)* By default, the language will be set based on the user's browser settings. You can override this by passing a language code in this parameter following one of two structures: `en` or `en_US`.

## Contents

### [index.php](index.php)
This is the main file that renders the PWA contents.

Without going into too many details, there are 2 elements worth mentioning:
1. A lot of stuff is happening inside the `<head>` tag; most of this boils down to gathering data based on the URL parameters and setting things up to form a valid PWA-enabled HTML file.
2. All the content that will be displayed to the end-user is found inside the various `<section>` tags and the lone `<aside>` tag. Nothing user-facing should be present within other files.

### [.htaccess](.htaccess)
In order to create an individual PWA for each game, a bit of redirection trickery is going on in the [.htaccess](.htaccess) file:

* All subfolders redirect straight to the root's [index.php](index.php) file, effectively making them all run the same code. This way, we can use each game's `uid` as a virtual subfolder in order to ensure each PWA can be installed separately.
* The `.webmanifest` extension is set to run PHP code, which allows us to build the PWA's parameters dynamically 

### [inc/get.php](inc/get.php)
This file's sole purpose is to parse the url parameters (as described above) and fetch the StadiaIcons [refs.json](/refs.json) reference sheet (stored as the `$data` variable).

***Note:** This document contains a direct reference to the website's full URL, you will need to modify this manually.*

### [pupteest.php](pupteest.php)
This minimalist page is called up as a popup in order to test if the browser is blocking popups.

### [stadia.webmanifest](stadia.webmanifest)
This file runs PHP code and outputs a valid PWA manifest in JSON based on URL parameters following the same structure as what is described above.

### [sw.js](sw.js)
This is called as a service worker. Though I am new to using these, as far as I can tell, it is used to cache all relevant content so that the PWA can be launched even when offline.

***Note:** This document contains a direct reference to the website's full URL, you will need to modify this manually.*

### [scripts.js](scripts.js)
Here is where a lot of the magic happens.

To keep things short, here are a few things that it does (not in any specific order):
1. Determine whether the page is being opened as a PWA (open the game popup and close itself) or inside a normal browser window (display the installation process).
2. Display the correct `<section>` of the [index.php](index.php) depending on the situation
3. Ensure that the browser allows popups by opening [puptest.php](puptest.php) as a popup.
4. Request PWA installation when the users clicks the relevant button (and react to the outcome).

### [inc/lang.php](inc/lang.php)
You might have noticed quite a few `__()` and `_e()` PHP functions being used throughout various pages. This is part of a custom translation system which is defined in this file.

The language can be overridden by passing a language code via the `&lang=` url parameter. Language codes should follow one of the following structures: `en` or `en_US`.

By default, the system uses the preferred language as defined by the browser to translate each page's contents based on the individual JSON files in the [lang folder](lang).