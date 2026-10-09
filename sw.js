// Hub service worker: network-first; precaches the hub and every app listed in apps.json so all of them work offline.
const CACHE = "justvibing-hub-v1";
self.addEventListener("install", e => {
  e.waitUntil((async () => {
    const c = await caches.open(CACHE);
    await c.addAll(["./", "./index.html", "./apps.json", "./apps/tower-defence/icon.svg"]);
    try {
      const list = await (await fetch("apps.json", { cache: "no-store" })).json();
      for (const a of list) for (const f of ["", "index.html", "manifest.webmanifest", a.icon || "icon.svg"]) await c.add(a.path + f).catch(() => {});
    } catch {}
  })());
  self.skipWaiting();
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith("justvibing-hub") && k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request)
      .then(res => { if (res.ok) { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); } return res; })
      .catch(() => caches.match(e.request, { ignoreSearch: true }))
  );
});
