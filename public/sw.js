const CACHE_NAME = "nano-ink-cache-v1";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  // A simple network-first strategy, falling back to cache, or just pass-through
  // Minimal requirement for PWA is to have a fetch handler.
  event.respondWith(
    fetch(event.request).catch(async () => {
      const cache = await caches.open(CACHE_NAME);
      return (
        (await cache.match(event.request)) ||
        new Response("Offline content missing.", { status: 404 })
      );
    }),
  );
});
