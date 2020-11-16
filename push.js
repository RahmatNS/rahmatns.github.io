var webPush = require('web-push');

const vapidKeys = {
   "publicKey": "BBR5SwJwG6AwWGeXIguR9Rqv0RDfGltwiur4sh_hIERIfHk4Uur3iatigiTP4rM4ZzfCgwp7Czw1ROT7d3HLIls",
   "privateKey": "3b_hgFqHQHvgSJv8P2UJPfs3aIrJIe2PVcTxtRL57pY"
};


webPush.setVapidDetails(
   'mailto:rahmat.nasution1993@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/c9SrYU3Vu0Q:APA91bGNsrH2jY1uedQ4tGXmeXQXhLS6piatsIS1eWRH52pkKdcD6P3emzEDbUURely5RzxeuwLAAtEcDN089kD9JzLmXnJc1A-lKzaPTvRDVaI0NA7ckmX2f-deEKOqsBZ5INTcsIhk",
   "keys": {
       "p256dh": "BH18Do5SPYy248d4AJLH31+OS5RRMG6IPeV65yvmjWqYCUTVZAoQgdKRyu9gizTFLzrQmyImCQwl9wBoIT/Cixs=",
       "auth": "Nt0PaIFLBQxWsk72pLaydw=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';

var options = {
   gcmAPIKey: '913419539092',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);
