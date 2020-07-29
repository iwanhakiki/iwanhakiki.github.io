// Periksa service worker
  if (!('serviceWorker' in navigator)) {
    console.log("Service worker tidak didukung browser ini.");
  } else {
    registerServiceWorker();
    requestPermission();
  }
  // Register service worker
  function registerServiceWorker() {
    return navigator.serviceWorker.register('service-worker.js')
      .then(function (registration) {
        console.log('Registrasi service worker berhasil.');
        return registration;
      })
      .catch(function (err) {
        console.error('Registrasi service worker gagal.', err);
      });
  }

  function requestPermission() {
    if ('Notification' in window) {
      Notification.requestPermission().then(function (result) {
      if (result === "denied") {
        console.log("Fitur notifikasi tidak diijinkan.");
        return;
      } else if (result === "default") {
        console.error("Pengguna menutup kotak dialog permintaan ijin.");
        return;
      }
  
      if (('PushManager' in window)) {
          navigator.serviceWorker.getRegistration().then(function(registration) {
          registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array("BE35BWEVHKuax_3Bl7CB2QNnXQzPSQeSH5LuwB9rFjRN162y3aLqOdWSWpUZlDqqnb3BfDcjFknA8iUsL8KgF9k")
         }).then(function(subscribe) {
          console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
          console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
          null, new Uint8Array(subscribe.getKey('p256dh')))));
          console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
          null, new Uint8Array(subscribe.getKey('auth')))));
         }).catch(function(e) {
          console.error('Tidak dapat melakukan subscribe ', e.message);
         });
       });
      }
     });
    }
  }

  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  // REQUEST API UNTUK PERTAMA KALI
  document.addEventListener("DOMContentLoaded", function() {
    var urlParams = new URLSearchParams(window.location.search);
    var isClasement = urlParams.get("classement");
    if (isClasement) {  
      // ambil artikel lalu tampilkan
      getClassement();
    } else {
      getTeams();
    }
  });