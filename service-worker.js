importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

const CACHE_NAME = "soccer-watch-20201116-2210";
const revision = '1';
var urlsToCache = [
  {url: "/", revision: revision},
  {url: "/icon-192.png", revision: revision},
  {url: "/icon-512.png", revision: revision},
  {url: "/manifest.json", revision: revision},
  {url: "/favicon.ico", revision: revision},
  {url: "/nav.html", revision: revision},
  {url: "/index.html", revision: revision},
  {url: "/competition.html", revision: revision},
  {url: "/match.html", revision: revision},
  {url: "/team.html", revision: revision},
  {url: "/pages/home.html", revision: revision},
  {url: "/pages/competitions.html", revision: revision},
  {url: "/pages/matches.html", revision: revision},
  {url: "/pages/favorite.html", revision: revision},
  {url: "/css/materialize.min.css", revision: revision},
  {url: "/css/style.css", revision: revision},
  {url: "/js/materialize.min.js", revision: revision},
  {url: "/sw-regist.js", revision: revision},
  {url: "/js/nav.js", revision: revision},
  {url: "/js/idb.js", revision: revision},
  {url: "/js/database.js", revision: revision},
  {url: "/js/fav-api.js", revision: revision},
  {url: "/js/competitions-api.js", revision: revision},
  {url: "/js/matches-api.js", revision: revision},
  {url: "/js/component.js", revision: revision},
];

workbox.precaching.precacheAndRoute(urlsToCache);

workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
        cacheName: 'images'
    })
);

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'football-api'
    })
);

workbox.routing.registerRoute(
  new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);

self.addEventListener('push', function(event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'icon-192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});
