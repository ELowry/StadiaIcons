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

importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js');

const uid = new URL(self.location).searchParams.get('uid');

if ( uid == 'defaultIcon' || /^[A-z0-9]{32}rcp1$/.test( uid ) )
{

	workbox.routing.registerRoute(
		new RegExp( '\/' + uid + '\/\?.*' ),
		new workbox.strategies.StaleWhileRevalidate( {
			"cacheName": "root",
			plugins: [
				new workbox.expiration.ExpirationPlugin( {
					maxEntries: 1000,
					maxAgeSeconds: 31536000
				} )
			]
		} )
	);

	workbox.routing.registerRoute(
		/\.(?:css|js)$/,
		new workbox.strategies.StaleWhileRevalidate( {
			"cacheName": "assets",
			plugins: [
				new workbox.expiration.ExpirationPlugin( {
					maxEntries: 1000,
					maxAgeSeconds: 31536000
				} )
			]
		} )
	);

	workbox.routing.registerRoute(
		/\.(?:png|jpg|jpeg|gif|bmp|webp|svg|ico)$/,
		new workbox.strategies.CacheFirst( {
			"cacheName": "images",
			plugins: [
				new workbox.expiration.ExpirationPlugin( {
					maxEntries: 1000,
					maxAgeSeconds: 31536000
				} )
			]
		} )
	);

	workbox.routing.registerRoute(
		/\.(?:webmanifest)(?:\?.*)?$/,
		new workbox.strategies.StaleWhileRevalidate( {
			"cacheName": "manifest",
			plugins: [
				new workbox.expiration.ExpirationPlugin( {
					maxEntries: 1000,
					maxAgeSeconds: 31536000
				} )
			]
		} )
	);

}
else
{
	console.error('%cStadiaIcons', 'display: inline-block; padding: 0em 0.2em; font-size: 1.08em; border-radius: 0.2em; font-weight: 900; -webkit-linear-gradient(107deg,#ff4c1d,#9b0063); background: linear-gradient(107deg,#ff4c1d,#9b0063); font-family:"Google Sans","Product Sans","Roboto",sans-serif;', 'The uid parameter is not valid' );
}