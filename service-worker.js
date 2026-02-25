const CACHE_NAME = "roussel-cache-v2";

const BASE_PATH = "/libroprueba/";

const urlsToCache = [
  BASE_PATH,
  BASE_PATH + "index.html",
  BASE_PATH + "sinopsislibro1.html",
  BASE_PATH + "sinopsislibro2.html",
  BASE_PATH + "libro1.html",
  BASE_PATH + "icon-192.png",
  BASE_PATH + "icon-512.png"
];

// INSTALACIÓN
self.addEventListener("install", event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// ACTIVACIÓN (borra cache viejo automáticamente)
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// FETCH (modo offline)
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
