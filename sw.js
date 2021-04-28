const cacheName = 'test2';
self.addEventListener('install', (e) => {
  const files = ['/index.html', './'];
  e.awaitUntil((async () => {
    const cache = await caches.open(cacheName);
    await cache.addAll(files);
  })());
});

self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    try {
      const response = await fetch(e.request);
      console.log('fetched from network, adding to cache');
      const cache = await caches.open(cacheName);
      cache.put(e.request, response.clone());
      return response;
    } catch (err) {
      console.log('network failed, retrieve from cache');
      return await caches.match(e.request);
    }
  })());
});
