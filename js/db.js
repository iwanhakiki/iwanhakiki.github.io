let dbPromised = idb.open("football", 1, function(upgradeDb){
    if(!upgradeDb.objectStoreNames.contains("teams")) {
        upgradeDb.createObjectStore("teams");
    }
});

function saveForLater(team) {
    dbPromised
    .then(function(db) {
        let tx = db.transaction("teams", "readwrite");
        let store = tx.objectStore("teams");
        console.log(db);
        console.log(team);
        store.put(team, team.id);
        return tx.complete;
    })
    .then(function() {
        M.toast({html: 'Data telah disimpan'});
    });
}

function deleteById(id) {
    dbPromised
    .then(function(db) {
        let tx = db.transaction('teams', 'readwrite');
        let store = tx.objectStore('teams');
        store.delete(parseInt(id.id));
        return tx.complete;
    }).then(function() {
        M.toast({html: 'Data telah dihapus'});
    });
}

function getAll() {
    return new Promise(function(resolve, reject) {
        dbPromised
        .then(function(db) {
            let tx = db.transaction("teams", "readonly");
            let store = tx.objectStore("teams");
            return store.getAll();
        })
        .then(function(teams) {
            resolve(teams);
        });
    });
}

function getById(id) {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          let tx = db.transaction("teams", "readonly");
          let store = tx.objectStore("teams");
          return store.get(parseInt(id, 0));
        })
        .then(function(team) {
          resolve(team);
        });
    });
}