# StadiaIcons
Icon Designs for Stadia Games.

![StadiaIcons header image](Header.png)

## What is it?
StadiaIcons a set of game icons designed with Google Stadia in mind ([stadia.com](https://stadia.com)). The objective is to have one logo for each game in the Google Stadia Library, following a simple design principle inspired by the Stadia logo and colors.

## How can I use it?
This project is free to use as you see fit. Simply download or reference the icons you wish to use in [PNG image format](/Images) or as [Windows Icons](/Icons), and have fun!

### Developers
The [refs.json](refs.json) file contains a list of all StadiaIcons referenced by game uid (the ones used in Stadia game URLs). Image paths can be constructed using the information contained in the `datasets` coupled with individual `uids`.

Each image uri can be constructed as follows: `datasets.X.uri` + `uids.Y.Z` + (optional)`other.altSuffix` + `datasets.X.extension` where `X` is the type of icon, `Y` is the game uid and `Z` is the icon variant id (`0` by default).

## Contents
Each game logo havs 2 versions by default, one with a tinted overlay designed to make the logos fit with the Stadia color scheme (this is the default design), and one with only the game's default image colors (this design is marked with `_alt` at the end of the filename).

For some games, aditional icons are available based on the game's promotional material.