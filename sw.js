// Service Worker for ExplorerTest11 PWA

const CACHE_NAME = 'vr-explorer-cache-v11';
const urlsToCache = [
  '/ExplorerTest11/',
  '/ExplorerTest11/index.html',
  '/ExplorerTest11/manifest.json',
  '/ExplorerTest11/icons/icon-192.png',
  '/ExplorerTest11/icons/icon-512.png'
];

// Install event: cache essential files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Fetch event: respond with cached file if available
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// Activate event: clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
