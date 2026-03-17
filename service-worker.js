const CACHE_NAME = "ataraxia-v1";

const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./audio/introduction audio 2.mp3",
  "./audio/Breath only meditation foundation meditation.mp3",
  "./audio/body awareness meditation.mp3",
  "./audio/Thought awareness meditation.mp3",
  ".audio/Emotional Awareness meditations.mp3",
  ".audio/deep focus meditation.mp3"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
