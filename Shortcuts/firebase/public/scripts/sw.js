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

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

var uid = new URL(self.location).searchParams.get('uid');

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
	console.error( 'The uid parameter is not valid' );
}