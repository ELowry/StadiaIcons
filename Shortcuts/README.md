# StadiaIcons Shortcuts

## What is it?
StadiaIcons Shortcuts is a system that leverages the power of Progressive Web Apps and some popup trickery to allow you to easily add individual Stadia game shortcuts to your computer in just a few clicks. And the best part is that each icon will automatically use StadiaIcons images!

Currently, you can access StadiaIcons Shortcuts through a [standalone page](https://stadiaicons.web.app/) that will allow you to access each game's installation page directly. The end-goal is to build this directly into Stadia using systems similar to [Stadia+](https://chrome.google.com/webstore/detail/stadia%20-extension/bbhmnnecicphphjamhdefpagipoegijd) or [Stadia Enhanced](https://chrome.google.com/webstore/detail/stadia-enhanced/ldeakaihfnkjmelifgmbmjlphdfncbfg).

## How it Works
StadiaIcons works by dynamically creating a unique webpage for each Stadia game with a StadiaIcons icon and letting you "install" this site as a Progressive Web App. This allows your device to launch the site directly from a custom shortcut; once launched, this site acts as a pass-through, opening a link to your game in a new tab and closing itself down right away.

### Requirements
StadiaIcons Shortcuts has currently only been tested on Windows 10 using the Chrome and Chromium Edge browsers. Users have also reported that it works well on ChromeOS, though I do not have the means of testing it myself.

***Important:* In order to be able to open your game "transparently" when you use the shortcut, the system requires that you authorize the website site to display popups. There doesn't seem to be any way around this at this time.**

### Uninstalling
Here are the steps to follow in order to "uninstall" a StadiaIcons Shortcut:

1. You will need to launch the shortcut and keep it from opening the game by pressing the `Ctrl` key immediately.
2. Then, you should look for the browser's options menu. It is usually represented by 3 dots in the top right of the window.
3. There, you should see an *Uninstall X* option — in some browsers you will want to confirm that you wish to remove all stored information — this will remove the shortcut and delete any remaining files/folders from your device.

## Security
The StadiaIcons Shortcuts system does not gather, track or store any of your information, it simply takes a game's unique ID and name and uses them to create a progressive web app that immediately redirects you to the game's Stadia link.

# For Developers

## Using Links

This is the simplest way to use StadiaIcons Shortcuts: simply set up a link within your app/plugin/project that follows this structure:

https://<span></span>stadiaicons<span></span>.web<span></span>.app/`{uid}`/?fullName=`{title}`&shortName=`{short tite}`&alt=`{alt marker}`&variant=`{variant id}`&lang=`{language}`

***Parameters:***
* `{uid}`: The game's unique uid, which is found in the game's Stadia launch url and is used to identify it in the StadiaIcons [refs.json](/refs.json) reference sheet.
* `{title}`: The game's title*.
* `{short tite}`: *(optional)* A shorter version of the title that will be used as the shortcut name in some cases (this can be useful with games that have huge titles that couldn't be displayed in most UIs)*.
* `{alt marker}`: *(optional)* If set to the `1` or `true`, the icon used for the PWA will not have the default red filter.
* `{variant id}`: *(optional)* In the case where a game has multiple icon variants, this `int` value will be used to determine which version to use (defaults to `0`).
* `{language}`: *(optional)* By default, the language will be set based on the user's browser settings. You can override this by passing a language code in this parameter following one of two structures: `en` or `en_US`.

**For both title attributes, you will need to escape `&` characters in the name by replacing them with `%26`; here is an example: [stadiaicons.web.app/6b43cecd79734ba28cef5894985c65f1rcp1/?fullName=Just Shapes %26 Beats](https://stadiaicons.web.app/6b43cecd79734ba28cef5894985c65f1rcp1/?fullName=Just%20Shapes%20%26%20Beats)*

## Deploying it Yourself

If you wish to deploy your own version of StadiaIcons Shortcuts, or use the code in your own projects, there are 2 versions of the code available:

1. The [Firebase](firebase) version designed to be deployed on Google's [Firebase](https://firebase.google.com) which uses *Firebase Hosting* and *Firebase Functions*. This version is the one being currently used at [stadiaicons.web.apps](https://stadiaicons.web.apps).
2. The [PHP](php) version designed to be deployed on a typical web hosting server. This version is no longer actively maintained but should still be fully functional. A demo is available at [stadiaicons.000webhostapp.com](https://stadiaicons.000webhostapp.com).

You will find details about each version in the respective folders.

## License

This project is under AGPL 3.0 license so you may use it freely; of course, it is always cool if you can include a mention or maybe even a link to this GitHub project :wink:.
