const CACHE_NAME = "music-player-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/script.js",
  "/songs.js",
  "/manifest.json",
  "/images/play.png",
  "/images/stop.png",
  "/images/prev.png",
  "/images/next.png",
  "/images/img 1.jpg",
  "/images/icons/icon-1.jpg",
  "/images/icons/icon-2.jpg"
];

// Install SW and cache files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Serve from cache
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
