// REGISTER SERVICE WORKER
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
      navigator.serviceWorker
     .register("/service-worker.js")
     .then(function() {
        console.log("Pendaftaran ServiceWorker berhasil");
     })
     .catch(function() {
       console.log("Pendaftaran ServiceWorker gagal");
     });
  });
} else {
  console.log("ServiceWorker belum didukung browser ini.");
}

document.addEventListener("DOMContentLoaded", function() {
  
    var urlParams = new URLSearchParams(window.location.search);
    var isFromSaved = urlParams.get("saved");
    var id = urlParams.get("id");
    var btnSave = document.getElementById("save");
    var btnDelete = document.getElementById("delete");

    var item = getTeamById();

    if (isFromSaved) {
      btnSave.style.display = 'none';
      getSavedTeamById();

      btnDelete.onclick = function() {
        console.log("Tombol delete ditekan");
        item.then(function(id){
          deleteById(id);
          isFromSaved = false;
        })
      }

    } else {
      btnDelete.style.display = 'none';

      btnSave.onclick = function() {
        console.log("Tombol FAB di klik.");
        item.then(function(team) {
          saveForLater(team);
        })
      }
    }
    
});