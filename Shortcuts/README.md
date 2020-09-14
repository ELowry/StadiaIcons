# StadiaIcons Shortcuts BETA
## What is it?
StadiaIcons Shortcuts is a system that leverages the power of Progressive Web Apps and some popup trickery to allow you to easily add individual Stadia game shortcuts to your computer in just a few clicks. And the best part is that each icon will automatically use StadiaIcons images!

As part of the Beta, you can access StadiaIcons Shortcuts through [temporary standalone page](https://stadiaicons.000webhostapp.com/games.php) that will allow you to access each game's installation page directly. The end-goal is to eventually build this directly into Stadia using systems similar to [Stadia+](https://chrome.google.com/webstore/detail/stadia%20-extension/bbhmnnecicphphjamhdefpagipoegijd) or [Stadia Enhanced](https://chrome.google.com/webstore/detail/stadia-enhanced/ldeakaihfnkjmelifgmbmjlphdfncbfg).

### BETA WARNING
This system is in **BETA**, and as such it is almost certainly *temporary*. It will eventually move it to a more stable platform or simply be integrated into existing extensions/userscripts by other developers.

***Note:** If/when the service goes down, your shortcuts will open a window pointing you to whatever has replaced it instead of launching the game. At that point you'll simply have to uninstall each shortcut (I will include some basic instructions) and reinstall them using the new system(s).*

## How it Works
StadiaIcons works by dynamically creating a unique webpage for each Stadia game with a StadiaIcons icon and letting you "install" this site as a Progressive Web App. This allows your device to launch the site directly from a custom shortcut; once launched, this site acts as a pass-through, opening a link to your game in a new tab and closing itself down right away.

### Requirements
StadiaIcons Shortcuts has currently only been tested on Windows 10 using the Chrome and Chromium Edge browsers. It may verry well function with other operating systems and/or browsers, but I have no means of testing this myself.

***Important:* In order to be able to open your game "transparently" when you use the shortcut, the system requires that you authorize the website site to display popups. There doesn't seem to be any way around this at this time.**

### Uninstalling
Here are the steps to follow in order to "uninstall" a StadiaIcons Shortcut:

1. You will need to launch the shortcut and keep it from opening the game by pressing the `Ctrl` key immediately.
2. Then, you should look for the browser's options menu. It is usually represented by 3 dots in the top right of the window.
3. There, you should see an *Uninstall X* option — in some browsers you will want to confirm that you wish to remove all stored information — this will remove the shortcut and delete any remaining files/folders from your device.

## Security
The StadiaIcons Shortcuts system does not gather, track or store any of your information, it simply takes a game's unique ID and name and uses them to create a progressive web app that immediately redirects you to the game's Stadia link.

# For Developers
The StadiaIcons Shortcuts Beta is more of a *proof of concept*, and my main objective is to make it available for other developers to use in their own projects.

Of course, if you make use of this project, it would be cool if you can include a mention or maybe even a link to this GitHub project :wink:.

In this folder, you will find all the code that is used to run the Beta site. Below, I will briefly explain what each file is used for, and how the system works.

## Basic Concept

The basic idea is that a single web page will be able to dynamically generate a functional Progressive Web App (PWA) using a specific URL structure:

https://<span></span>yourdomain<span></span>.com/`{uid}`/?fullName=`{title}`&uid=`{uid}`&shortName=`{short tite}`&alt=`{alt marker}`&variant=`{variant id}`

***Parameters:***
* `{uid}`: The game's unique uid, which is found in the game's Stadia launch url and is used to identify it in the StadiaIcons [refs.json](/refs.json) reference sheet.
* `{title}`: The game's title.
* `{short tite}`: *(optional)* A shorter version of the title that will be used as the shortcut name in some cases (this can be useful with games that have huge titles that couldn't be displayed in most UIs).
* `{alt marker}`: *(optional)* If set to the `altSuffix` value found in  the StadiaIcons [refs.json](/refs.json) reference sheet (`_alt` by default), the icon used for the PWA will not have the red filter.
* `{variant id}`: *(optional)* In the case where a game has multiple icon variants, this `int` value will be used to determine which version to use (defaults to `0`à.

## Contents
### [index.php](index.php)
This is the main file that renders the PWA contents.

Without going into too many details, there are 2 elements worth mentioning:
1. A lot of stuff is happening inside the `<head>` tag; most of this boills down to gathering data based on the URL parameters and setting things up to form a valid PWA-enabled HTML file.
2. All the content that will be displayed to the end-user is found inside the various `<section>` tags and the lone `<aside>` tag. Nothing user-facing should be present within other files.

### [.htaccess](.htaccess)
In order to create an individual PWA for each game, a bit of redirection trickery is going on in the [.htaccess](.htaccess) file:

* All subfolders redirect straight to the root's [index.php](index.php) file, effectively making them all run the same code. This way, we can use each game's `uid` as a virtual subfolder in order to ensure each PWA can be installed separately.
* The `.webmanifest` extension is set to run PHP code, which allows us to build the PWA's parameters dynamically 

### [get.php](get.php)
This file's sole purpose is to parse the url parameters (as described above) and fetch the StadiaIcons [refs.json](/refs.json) reference sheet (stored as the `$data` variable).

***Note:** This document contains a direct reference to the website's full URL, you will need to modify this manually.*

### [pupteest.php](pupteest.php)
This minimalist page is called up as a popup in order to test if the browser is blocking popups.

### [stadia.webmanifest](stadia.webmanifest)
This file runs PHP code and outputs a valid PWA manifest in JSON based on URL parameters following the same structure as what is described above.

### [sw.js](sw.js)
This is called as a service worker. Though I am new to using these, as far as I can tell, it is used to cache all relevant content so that the PWA can be launched even when offline.

***Note:** This document contains a direct reference to the website's full URL, you will need to modify this manually.*

###[scripts.js](scripts.js)
Here is where a lot of the magic happens.

To keep things short, here are a few things that it does (not in any specific order):
1. Determine whether the page is being opened as a PWA (open the game popup and close itself) or inside a normal browser window (display the installation process).
2. Display the correct `<section>` of the [index.php](index.php) depending on the situation
3. Ensure that the browser allows popups by opening [puptest.php](puptest.php) as a popup.
4. Request PWA installation when the users clicks the relevant button (and react to the outcome).