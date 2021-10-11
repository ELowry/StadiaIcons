#StadiaIcons Shortcuts Translation Guide

## The Goal

[StadiaIcons Shortcuts](https://elowry.github.io/StadiaIcons/) needs ***your*** help with translation!

I wish to make the service easy to use and understand for all Stadia users, but since I only speak 2 languages fluently, I need you to give me a hand!

## How can I help?

Here's how to go about things:

1. First, check [this list of posts](https://github.com/ELowry/StadiaIcons/issues?q=label%3Atranslation+) in a new tab `Ctrl+click` to see if there isn't already a translation in your language. If there is, you can always check it for mistakes or improvements :grimacing:
2. If there is no translation for your language, simply create a new **"issue"** to post your translation into.
3. *(Optional) You can set the issue's* label *to* translation *on the right; otherwise I'll take care of it.*
4. Copy the big block of code below and paste it into your newly created issue.
5. Using the [Detailed Information](#detailed-information) section at the bottom of this page, you should have all the information you need to translate things.

### Tips & Info
* *You just need to translate the bits on the right. So no need to translate the titles (such as* `"generic"`*), just the actual bits of text (like the word **Error** in* `"error": "Error",`
* *If something is unclear or you have a question, just leave that part untranslated and add your question at the bottom of your post, you can always edit the post or simply add the missing bit as a reply later.*
* *There are markers that look like* `{0}` *all over this document, these are sections that get filled in automatically by the code, I will do my best to make it clear what they are in the [Detailed Information](#detailed-information) section below.*

## The Code

````json
```json
{
	"generic":
	{
		"error": "Error",
		"warning": "Warning",
		"important": "IMPORTANT"
	},
	"meta":
	{
		"title": "StadiaIcons – {0} – Shortcut",
		"simpleTitle": "{0} shortcut",
		"description": "This page will allow you to install {0} as a Progressive Web App with its corresponding StadiaIcon.",
		"keywords": "Stadia, Icons, Design, Gaming, Game, Shortcut{0}"
	},
	"main":
	{
		"installed":
		{
			"title": "Installation Successful",
			"info": "You should now be able to open {0} directly from your Desktop or Start Menu.",
			"button": "Launch {0} Now"
		},
		"installPrompt":
		{
			"prompt": "Create a shortcut on your device.",
			"warningTitle": "WARNING",
			"warning1": "Unfortunately the icons for this game is not yet available.",
			"warning2": "You can still install the shortcut, but it will have a default icon for the time being.",
			"warningButton": "I Understand",
			"toggle": "{0}Switch Style"
		},
		"popupPrompt":
		{
			"title": "First Installation",
			"inset1": "This is the first time you are installing a StadiaIcons shortcut.",
			"inset2": "In order to create shortcuts, you must authorize this website to display popup windows*.",
			"inset3": "Depending on your browser, you should see a message requesting this authorization. It is typically to the right of the address bar.",
			"request": "If you do not see this message or once you have given authorization, please press this button:",
			"button": "Test Popup Access",
			"footnote": "* StadiaIcon shortcuts use Progressive Web Apps, and in order to open your game without the address bar at the top, the app instead opens the game in a regular browser tab using a popup and immediately closes in the background."
		},
		"uninstall":
		{
			"stopped": "Stopped",
			"info": "You pressed the {0} key while the shortcut was launching.",
			"uninstall": "You may be trying to uninstall this shortcut. If that is the case, you should find an <em>uninstall</em> button in this window's settings. This menu is typically located in the top right.",
			"restart": "If not, you can simply press this button to start your game:",
			"button": "Launch {0}"
		},
		"unavailable":
		{
			"status": "Your browser may not be supported",
			"browsers": "We strongly recommend using {0}Download Chrome{1} or {2}Download Edge{3}."
		},
		"exists":
		{
			"status": "The shortcut may already be installed",
			"info": "If you have already installed the {0} {1} shortcut, you no longer need to access this link; simply use the installed shortcut to play your game!",
			"fallback":  "Otherwise, something didn't go as planned; we suggest you reload this page to see if things get fixed."
		},
		"alert":
		{
			"info": "To uninstall this shortcut, please press the {0} key as the shortcut launches."
		}
	},
	"home":
	{
		"metaDescription": "Install shortcuts for Stadia games to your desktop with corresponding StadiaIcons!",
		"title": "Welcome to {0}!",
		"whatTitle": "What is it?",
		"iconsDescription": "{0} is a set of game icons designed with {1} in mind. Each icon follows a simple design principle inspired by the Stadia logo and colors.",
		"shortcutsDescription": "As for {0}, it allows you to easily add individual Stadia game shortcuts with their corresponding {1} to your devices in just a few clicks.",
		"howTitle": "How does it work?",
		"howInfo": "It's really quite simple: select a Stadia game you want to install from the list below and we'll guide you through the process.",
		"button": "Show Me!"
	},
	"error":
	{
		"description": "There was an error processing your {0} request.",
		"instructions": "Please close this page and try again. If the problem persists, please contact us on Reddit at {0} or on {1}.",
		"title": "Error {0}:",
		"cta": "{0}Click Here{1} to return to the home page.",
		"codes":
		{
			"400": "Bad Request",
			"401": "Unauthorized",
			"403": "Forbidden",
			"404": "Page Not Found"
		},
		"head":
		{
			"title": "StadiaIcons – Error {0}",
			"simpleTitle": "StadiaIcons – Error",
			"description": "There was an error loading this page: Error {0}, {1}"
		}
	},
	"popupTest":
	{
		"warning": "This window should close shortly.",
		"request": "Please do not close it yourself.",
		"head":
		{
			"title": "Popup Test",
			"description": "This page is used to test for popup authorization."
		}
	},
	"footer":
	{
		"copyright": "Copyright © {0} Eric Lowry. Licensed under {1}.",
		"links": "Follow {0}StadiaIcons on GitHub{1} | {2}Privacy Policy{3}"
	},
	"privacy":
	{
		"title": "Privacy Policy",
		"what": "What we Store",
		"whatText": "This website is built on {0}Google's Firebase platform{1} and uses <em>Firebase Hosting</em> and <em>Firebase Functions</em>. As a result, your <strong>IP address</strong> will be stored for a couple of months to avoid misuse of the platform.",
		"whatLink": "You can learn more at {0}this link{1}.",
		"cookies": "Cookies",
		"cookiesText": "Though we love cookies {0}, we much prefer croissants {1}... So we don't store any cookies, don't worry!",
		"head":
		{
			"title": "StadiaIcons – Privacy Policy",
			"description": "Keep your cookies, we have croissants!"
		}
	}
}
```
````

## Detailed Information

Here, I am going to try and do my best to give some context to each line.

You will certainly have seen markers that look like `{0}` all over this document, these are sections that get filled in automatically by the code. Here I will fill them in with a description of what they represent as to make things easier to understand.

As you 

### generic

error: `Error`

warning: `Warning`

important: `IMPORTANT` *<– Try and keep it in captial letters if possible.*

### meta

title: `StadiaIcons – {Game Name} – Shortcut`

simpleTitle: `{Game Name} shortcut`

description: `This page will allow you to install {Game Name} as a Progressive Web App with its corresponding StadiaIcon.`

keywords: `Stadia, Icons, Design, Gaming, Game, Shortcut{Game Name or empty}`

### main

#### installed

title: `Installation Successful`

info: `You should now be able to open {Game Name} directly from your Desktop or Start Menu.`

button: `Launch {Game Name} Now`

#### installPrompt

prompt: `Create a shortcut on your device.`

warningTitle: `WARNING` *<– Try and keep it in captial letters if possible.*

warning1: `Unfortunately the icons for this game is not yet available.`

warning2: `You can still install the shortcut, but it will have a default icon for the time being.`

warningButton: `I Understand`

toggle: `{0}Switch Style`

#### popupPrompt

title: `First Installation`

inset1: `This is the first time you are installing a StadiaIcons shortcut.` 

inset2: `In order to create shortcuts, you must authorize this website to display popup windows*.`

inset3: `Depending on your browser, you should see a message requesting this authorization. It is typically to the right of the address bar.`

request: `If you do not see this message or once you have given authorization, please press this button:`

button: `Test Popup Access`  *<– The name of the button mentioned just above. It reloads the page to see if the test popup can appear successfully.*

footnote: `* StadiaIcon shortcuts use Progressive Web Apps, and in order to open your game without the address bar at the top, the app instead opens the game in a regular browser tab using a popup and immediately closes in the background.`

#### uninstall

stopped: `Stopped` *<– This is part of a title that looks like: StadiaIcons Shortcuts – Stopped*

info: `You pressed the {Ctrl} key while the shortcut was launching.`

uninstall: `You may be trying to uninstall this shortcut. If that is the case, you should find an <em>uninstall</em> button in this window's settings. This menu is typically located in the top right.` *<– The `<em>` and `</em>` tags are used to italicize the text, please keep them in :smile:*

restart: `If not, you can simply press this button to start your game:`

button: `Launch {Game Name}`

#### unavailable

status: `Your browser may not be supported`

browsers: `We strongly recommend using {0}Download Chrome{1} or {2}Download Edge{3}.` *<– In this case, the `{X}` tags are used to turn the words into links, please keep them stuck to the words and in the correct order.*

#### exists

status: `The shortcut may already be installed`,

info: `If you have already installed the {Game Name} {StadiaIcons} shortcut, you no longer need to access this link; simply use the installed shortcut to play your game!`,

fallback:  `Otherwise, something didn't go as planned; we suggest you reload this page to see if things get fixed.`

#### alert

info: `To uninstall this shortcut, please press the {Ctrl} key as the shortcut launches.`

### home

metaDescription: `Install shortcuts for Stadia games to your desktop with corresponding StadiaIcons!`

title: `Welcome to {StadiaIcons Shortcuts}!`

whatTitle: `What is it?`

iconsDescription: `{StadiaIcons} is a set of game icons designed with {Google Stadia} in mind. Each icon follows a simple design principle inspired by the Stadia logo and colors.`

shortcutsDescription: `As for {StadiaIcons Shortcuts}, it allows you to easily add individual Stadia game shortcuts with their corresponding {StadiaIcons} to your devices in just a few clicks.`

howTitle: `How does it work?`

howInfo: `It's really quite simple: select a Stadia game you want to install from the list below and we'll guide you through the process.`

button: `Show Me!`

### error

description: `There was an error processing your {StadiaIcons Shortcuts} request.`

instructions: `Please close this page and try again. If the problem persists, please contact us on Reddit at {u/EricLowry} or on {GitHub}.`

title: `Error {40X}:`

cta: `{0}Click Here{1} to return to the home page.`

#### codes

400: `Bad Request` *<– Here and in the next few bits the error codes are universal, and you can probably find the proper translation online.*

401: `Unauthorized`

403: `Forbidden`

404: `Page Not Found`

#### head

title: `StadiaIcons – Error {40X}`

simpleTitle: `StadiaIcons – Error`

description: `There was an error loading this page: Error {40X}, {Error Description}`

### popupTest

warning: `This window should close shortly.`

request: `Please do not close it yourself.`

#### head

title: `Popup Test`

description: `This page is used to test for popup authorization.`

### footer

copyright: `Copyright © {Year} Eric Lowry. Licensed under {AGPL 3.0}.`

links: `Follow {0}StadiaIcons on GitHub{1} | {2}Privacy Policy{3}` *<– In this case, the `{X}` tags are used to turn the words into links, please keep them stuck to the words and in the correct order.*

### privacy

title: `Privacy Policy`
what": `What we Store`
whatText": `This website is built on {0}Google's Firebase platform{1} and uses <em>Firebase Hosting</em> and <em>Firebase Functions</em>. As a result, your <strong>IP address</strong> will be stored for a couple of months to avoid misuse of the platform.` *<– In this case, the `{X}` tags are used to turn the words into links, please keep them stuck to the words and in the correct order.*
whatLink: `You can learn more at {0}this link{1}.` *<– In this case, the `{X}` tags are used to turn the words into links, please keep them stuck to the words and in the correct order.*
cookies: `Cookies`
cookiesText: `Though we love cookies {Cookie Emoji}, we much prefer croissants {Croissant Emoji}... So we don't store any cookies, don't worry!`

#### head

title: `StadiaIcons – Privacy Policy`
description: `Keep your cookies, we have croissants!`
