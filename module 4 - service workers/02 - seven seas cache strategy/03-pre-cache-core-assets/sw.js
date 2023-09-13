let coreAssets = [
	'main.css',
	'main.js',
	'logo.svg',
	'favicon.ico'
];

// On install, cache some stuff
self.addEventListener('install', function (event) {

	// Activate immediately
	self.skipWaiting();

	// Cache core assets
	event.waitUntil(caches.open('app').then(function (cache) {
		for (let asset of coreAssets) {
			cache.add(new Request(asset));
		}
		return cache;
	}));

});