// Core assets
let coreAssets = [
	'offline.html',
	'index.html',
	'treasure.html',
	'dice.html',
	'style.css',
	'index.js',
	'treasure.js',
	'dice.js'
];

// On install, activate immediately
self.addEventListener('install', function (event) {

	// Activate immediately
	self.skipWaiting();

	// Cache core assets
	event.waitUntil(caches.open('core').then(function (cache) {
		for (let asset of coreAssets) {
			cache.add(new Request(asset));
		}
		return cache;
	}));

});

// Listen for request events
self.addEventListener('fetch', function (event) {

	// Get the request
	let request = event.request;

	// Bug fix
	// https://stackoverflow.com/a/49719964
	if (event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin') return;

	// HTML files
	// Network-first
	if (request.headers.get('Accept').includes('text/html')) {
		event.respondWith(
			fetch(request).then(function (response) {

				// Save the response to the cache
				event.waitUntil(caches.open('pages').then(function (cache) {
					return cache.put(request, response);
				}));

				// Return the response
				return response;

			}).catch(function (error) {
				return caches.match(request).then(function (response) {
					return response || caches.match('offline.html');
				});
			})
		);
		return;
	}

	// CSS & JavaScript & Images
	// Offline-first
	if (request.headers.get('Accept').includes('text/css') || request.headers.get('Accept').includes('text/javascript') || request.headers.get('Accept').includes('image')) {
		event.respondWith(
			caches.match(request).then(function (response) {
				return response || fetch(request).then(function (response) {

					// If the request is for an image, save it in cache
					if (request.headers.get('Accept').includes('image')) {
						event.waitUntil(caches.open('pages').then(function (cache) {
							return cache.put(request, response);
						}));
					}

					// Return the response
					return response;

				});
			})
		);
	}

});