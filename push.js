var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BE35BWEVHKuax_3Bl7CB2QNnXQzPSQeSH5LuwB9rFjRN162y3aLqOdWSWpUZlDqqnb3BfDcjFknA8iUsL8KgF9k",
   "privateKey": "8FM37u2iGP_lxtuccnOWjpEh0eEFkYLHuV9NxBExLcg"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/c0yppIf_V6c:APA91bF9fEhLMuBH543glRaZOClDCbCKYNb-Jek3EInCiK0ZGfTsD5DVEp9ZptoPBIHvGnVQCBONjWiERJMoUq1gBm_4L0o0l403pEhHyPQMtEemqyhNYjUrF_J928_RliaMew8UZFpT",
   "keys": {
       "p256dh": "BHUm0CBQ5IgBIoVrCzne3elUy8Vl4lH6jTO3XkWru0A7pV1OJe7xE9v0MNC+CW4ZwYv5Yj0OFAwe/H0VA1K0vSE=",
       "auth": "mGch9/VKdLQxkEFdxYp1Kg=="
   }
};
var payload = 'Selamat! Anda Mendapatakan Notifikasi';
 
var options = {
   gcmAPIKey: '354912586110',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
).catch(function(err){
   console.log(err);
});