// 喵咪電力公司已搬到 https://fallcloudlsk.github.io/Meowpany/Meowatt/
// 這個 service worker 只負責清掉舊網址的快取並自行解除註冊，讓舊網址能看到轉址頁。
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k.startsWith('喵咪電力公司-sw-cache-')).map((k) => caches.delete(k)));
    await self.registration.unregister();
    const clients = await self.clients.matchAll({ type: 'window' });
    clients.forEach((c) => c.navigate(c.url));
  })());
});
