// Simple service worker: cache-first for assets, network-fallback for others
const CACHE_NAME = 'holox-fireos-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/manifest.json'
  // add any other static assets you want cached, e.g. icons
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  const req = event.request;
  // for navigation requests, try network first then cache (so updated HTML preferred)
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req).catch(() => caches.match('/index.html'))
    );
    return;
  }
  // otherwise cache-first
  event.respondWith(
    caches.match(req).then(cached => cached || fetch(req))
  );
});