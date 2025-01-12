// cache name, cache files
var CACHE_NAME = 'dabimas-factor-v1';
var urlsToCache = [
    '/dabimastools.github.io/dabimasFactorLimiTeD/index.html',
    '/dabimastools.github.io/dabimasFactorLimiTeD/json/dabimasFactor.json',
    '/dabimastools.github.io/dabimasFactorLimiTeD/json/brosData.json',
    '/dabimastools.github.io/dabimasFactorLimiTeD/css/style.css',
    '/dabimastools.github.io/dabimasFactorLimiTeD/css/loading.css',
    '/dabimastools.github.io/dabimasFactorLimiTeD/css/materialdesignicons.min.css',
    '/dabimastools.github.io/dabimasFactorLimiTeD/css/materialdesignicons.min.css.map',
    '/dabimastools.github.io/dabimasFactorLimiTeD/css/notosansjapanese.css',
    '/dabimastools.github.io/dabimasFactorLimiTeD/css/vuetify_compact.min.css',
    '/dabimastools.github.io/dabimasFactorLimiTeD/css/vuetify.min.css',
    '/dabimastools.github.io/dabimasFactorLimiTeD/vue/vue.min.js',
    '/dabimastools.github.io/dabimasFactorLimiTeD/vue/vuetify.js',
    '/dabimastools.github.io/dabimasFactorLimiTeD/vue/vuetify.js.map',
];

// install cache
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches
        .open(CACHE_NAME)
        .then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

// use cache
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.match(event.request).then(function (response) {
                return response || fetch(event.request).then(function (response) {
                    return caches.open(CACHE_NAME).then(function (cache) {
                        cache.put(event.request, response.clone());
                        return response;
                    });
                });
            });
        })
    );
});

// refresh cache
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    return cacheName !== CACHE_NAME;
                }).map(function (cacheName) {
                    return caches.delete(cacheName);
                })
            );
        }).then(function () {
            clients.claim();
        })
    );
});

