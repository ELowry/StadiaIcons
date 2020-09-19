importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

var uid = new URL(self.location).searchParams.get('uid');

if (uid == 'defaultIcon' || /^[A-z0-9]{32}rcp1$/.test(uid))
{

	workbox.routing.registerRoute(
		new RegExp('https:\/\/stadiaicons\.000webhostapp.com\/' + uid + '\/'),
		new workbox.strategies.CacheFirst({
			"cacheName": "root",
			plugins: [
				new workbox.expiration.ExpirationPlugin({
					maxEntries: 1000,
					maxAgeSeconds: 31536000
				})
			]
		})
	);

	workbox.routing.registerRoute(
		/\.(?:css|js)$/,
		new workbox.strategies.CacheFirst({
			"cacheName": "assets",
			plugins: [
				new workbox.expiration.ExpirationPlugin({
					maxEntries: 1000,
					maxAgeSeconds: 31536000
				})
			]
		})
	);

	workbox.routing.registerRoute(
		/\.(?:png|jpg|jpeg|gif|bmp|webp|svg|ico)$/,
		new workbox.strategies.CacheFirst({
			"cacheName": "images",
			plugins: [
				new workbox.expiration.ExpirationPlugin({
					maxEntries: 1000,
					maxAgeSeconds: 31536000
				})
			]
		})
	);

	workbox.routing.registerRoute(
		/\.(?:webmanifest)$/,
		new workbox.strategies.CacheFirst({
			"cacheName": "manifest",
			plugins: [
				new workbox.expiration.ExpirationPlugin({
					maxEntries: 1000,
					maxAgeSeconds: 31536000
				})
			]
		})
	);
	
}
else
{
	console.error('The uid parameter is not valid');
}