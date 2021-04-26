const cacheName = 'test1';
self.addEventListener('install', (e) => {
  const files = ['/index.html', './'];
  e.awaitUntil((async () => {
    const cache = await caches.open(cacheName);
    await cache.addAll(files);
  })());
});

self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    const r = await caches.match(e.request);
    if (r) return r;
    console.log('cache miss, fetching from network');
    const response = await fetch(e.request);
    const cache = await caches.open(cacheName);
    cache.put(e.request, response.clone());
    return response;
  })());
});
