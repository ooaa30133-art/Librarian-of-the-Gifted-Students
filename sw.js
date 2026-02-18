const CACHE_NAME = 'librarian-pwa-cache-v1';
const urlsToCache = [
  '/Librarian-of-the-Gifted-Students/',
  '/Librarian-of-the-Gifted-Students/index.html',
  '/Librarian-of-the-Gifted-Students/manifest.json',
  '/Librarian-of-the-Gifted-Students/icons/icon-72x72.png',
  '/Librarian-of-the-Gifted-Students/icons/icon-96x96.png',
  '/Librarian-of-the-Gifted-Students/icons/icon-128x128.png',
  '/Librarian-of-the-Gifted-Students/icons/icon-144x144.png',
  '/Librarian-of-the-Gifted-Students/icons/icon-152x152.png',
  '/Librarian-of-the-Gifted-Students/icons/icon-192x192.png',
  '/Librarian-of-the-Gifted-Students/icons/icon-384x384.png',
  '/Librarian-of-the-Gifted-Students/icons/icon-512x512.png',
  'https://fonts.googleapis.com/css2?family=Tajawal&display=swap',
  'https://fonts.gstatic.com/s/tajawal/v9/Irfp-OqBc2hpHtCR6TC_gQ.woff2' // Example Tajawal font file, might need to be updated
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
