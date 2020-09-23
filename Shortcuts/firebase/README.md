# StadiaIcons Shortcuts Firebase version

This version is designed to be deployed using google's [Firebase](https://firebase.google.com) platform.

In order to deploy this project, you will need to set up [Firebase Hosting](https://firebase.google.com/docs/hosting/) and [Firebase Cloud Functions](https://firebase.google.com/docs/functions) in your [Firebase Project](https://firebase.google.com/docs/projects/learn-more).

***Note:** The reasons for using *Cloud Functions* is that in order for a Progressive Web App's manifest file to be properly recognized by many applications, it must be delivered to the client app as a properly formatted `JSON` file, which prevents us from generating it locally on the client application.*

## Usage

In order to call a StadiaIcons Shortcut for a given Stadia title, the following link structure will be able to dynamically generate a functional Progressive Web App (PWA):

https://<span></span>yourapp<span></span>.web<span></span>.app/`{uid}`/?fullName=`{title}`&shortName=`{short tite}`&alt=`{alt marker}`&variant=`{variant id}`&lang=`{language}`

***Parameters:***
* `{uid}`: The game's unique uid, which is found in the game's Stadia launch url and is used to identify it in the StadiaIcons [refs.json](/refs.json) reference sheet.
* `{title}`: The game's title*.
* `{short tite}`: *(optional)* A shorter version of the title that will be used as the shortcut name in some cases (this can be useful with games that have huge titles that couldn't be displayed in most UIs)*.
* `{alt marker}`: *(optional)* If set to the `1` or `true`, the icon used for the PWA will not have the default red filter.
* `{variant id}`: *(optional)* In the case where a game has multiple icon variants, this `int` value will be used to determine which version to use (defaults to `0`).
* `{language}`: *(optional)* By default, the language will be set based on the user's browser settings. You can override this by passing a language code in this parameter following one of two structures: `en` or `en_US`.

**For both title attributes, you will need to escape `&` characters in the name by replacing them with `%26`; here is an example: [stadiaicons.web.app/6b43cecd79734ba28cef5894985c65f1rcp1/?fullName=Just Shapes %26 Beats](https://stadiaicons.web.app/6b43cecd79734ba28cef5894985c65f1rcp1/?fullName=Just%20Shapes%20%26%20Beats)*

## Contents

### [functions/index.js](functions/index.js)
This file registers 3 *Cloud Functions*, two of which are described in the next section.

All of these functions are based around a similar structure:

1. Gather data from URL parameters and JSON files.
2. Sanitize and parse this data to organize it into properly formatted objects. Here is an example of the resulting data structure: [stadiaicons.web.app/info/6b43cecd79734ba28cef5894985c65f1rcp1/?fullName=Just Shapes %26 Beats](https://stadiaicons.web.app/info/6b43cecd79734ba28cef5894985c65f1rcp1/?fullName=Just%20Shapes%20%26%20Beats)
3. Generate a `HTML` or `JSON` file and send it the client application.

All 3 functions `require`(call upon) some base scripts to do these actions:

#### [functions/inc/get/uid.js](functions/inc/get/uid.js)

This file is used to retrieve and sanitize the game uid from the called url and make sure it is properly formatted.

#### [functions/inc/get/params.js](functions/inc/get/params.js)

This file is used to retrieve and sanitize all the other url parameters described above and to transform them into usable variables based on their uses.

#### [functions/inc/get/refs.js](functions/inc/get/refs.js)

This file is used to retrieve the StadiaIcons [refs.json](/refs.json) file structure.

#### [functions/inc/gather.js](functions/inc/gather.js)

This file gathers all the previously retrieved information and generates a single, properly formatted data structure which you can see an example of here: [stadiaicons.web.app/info/6b43cecd79734ba28cef5894985c65f1rcp1/?fullName=Just Shapes %26 Beats](https://stadiaicons.web.app/info/6b43cecd79734ba28cef5894985c65f1rcp1/?fullName=Just%20Shapes%20%26%20Beats)

This is also where the verification to see if the game uid is present within the StadiaIcons images list. if not, the default Stadia logo is used as a fallback.

### [firebase.json](firebase.json)
In order to create an individual PWA for each game, a bit of redirection trickery is going on in this file:

* All subfolders which follow a typical Stadia uid format call the `shortcut` *Cloud Function* and display the main shortcut page.
* All `stadia.webmanifest` files within these same subfolders call the `webmanifest` *Cloud Function* and return a properly formatted PWA manifest.

### [functions/inc/shortcut.js](functions/inc/shortcut.js)
This file is the endpoint of the `shortcut` function. It contains the main HTML code that is to be sent to the client application.

Without going into too many details, there are 2 elements worth mentioning:
1. A lot of stuff is happening inside the `<head>` tag; most of this boils down to using the previously gathered data and setting things up to form a valid PWA-enabled HTML file.
2. All the content that will be displayed to the end-user is found inside the various `<section>` tags and the lone `<aside>` tag. Nothing user-facing should be present within other files.

***Note:** This document contains a direct reference to the website's full URL, you will need to modify this manually.*

### [functions/inc/webmanifest.js](functions/inc/webmanifest.js)
This file is the endpoint of the `webmanifest` function and outputs a valid PWA manifest in JSON based on the previously gathered data.

### [public/pupteest.html](public/pupteest.html)
This minimalist page is called up as a popup in order to test if the browser is blocking popups.

### [public/scripts/sw.js](public/scripts/sw.js)
This is called as a service worker. Though I am new to using these, as far as I can tell, it is used to cache all relevant content so that the PWA can be launched even when offline.

***Note:** This document contains a direct reference to the website's full URL, you will need to modify this manually.*

### [public/scripts/scripts.js](public/scripts/scripts.js)
Here is where a lot of the magic happens.

To keep things short, here are a few things that it does (not in any specific order):
1. Determine whether the page is being opened as a PWA (open the game popup and close itself) or inside a normal browser window (display the installation process).
2. Display the correct `<section>` of the [index.php](index.php) depending on the situation
3. Ensure that the browser allows popups by opening [puptest.php](puptest.php) as a popup.
4. Request PWA installation when the users clicks the relevant button (and react to the outcome).

### [public/scripts/lang.js](public/scripts/lang.js)
You might have noticed quite a few HTML elements with `class="lang"` and `data-lang="X"` properties throughout various pages. This is part of a custom translation system which is defined in this file.

The language can be overridden by passing a language code via the `&lang=` url parameter. Language codes should follow one of the following structures: `en` or `en_US`.

By default, the system uses the preferred language as defined by the browser to translate each page's contents based on the individual JSON files in the [public/lang](public/lang) folder.