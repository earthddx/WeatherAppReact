const CACHE_NAME = "V1";
const urlsToCache = ["index.html", "offline.html"];

const self = this;

//install serviceworker
self.addEventListener("install", (event) => {
  console.log(`${CACHE_NAME} installing...`);
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");

      return cache.addAll(urlsToCache);
    })
  );
});

//listen for requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(
        (error) => caches.match("offline.html") //if data fetch failed, show offline.html
      );
    })
  );
});

//activate the serviceworker
//removes old caches with CACHE_NAME
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
