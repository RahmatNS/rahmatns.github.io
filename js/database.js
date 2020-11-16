var dbPromise = idb.open("soccer-watch", 2, function(upgradeDb) {
  if (!upgradeDb.objectStoreNames.contains("competitions")) {
    upgradeDb.createObjectStore("competitions", {keyPath: 'id', autoIncrement:true});
  }
  if (!upgradeDb.objectStoreNames.contains("teams")) {
    upgradeDb.createObjectStore("teams", {keyPath: 'id', autoIncrement:true});
  }
});


// function addCompetitions(competitions){
// 	competitions.forEach((comp, index){
// 		addCompetition(comp);
// 	});
// }

var addCompetition = function(competition){
	dbPromise.then(function(db) {
		var tx = db.transaction('competitions', 'readwrite');
		var store = tx.objectStore('competitions');
		store.put(competition);
		return tx.complete;
	}).then(function() {
		console.log("Competition is successfully stored")
	}).catch(function() {
		console.log("Competition failed to stored")
	});
}


var addTeam = function(team){
	dbPromise.then(function(db) {
		var tx = db.transaction('teams', 'readwrite');
		var teams = tx.objectStore('teams');
		teams.put(team);
		return tx.complete;
	}).then(function() {
		console.log("Team is successfully stored")
	}).catch(function(e) {
		console.log("Team failed to stored")
		console.log(e);
	});
}

var deleteTeam = function(team_id){
	dbPromise.then(function(db) {
		var tx = db.transaction('teams', 'readwrite');
		var teams = tx.objectStore('teams');
		teams.delete(team_id);
		return tx.complete;
	}).then(function() {
		console.log("Team is successfully deleted")
	}).catch(function(e) {
		console.log("Team failed to delete")
		console.log(e);
	});
}

var getTeam = function(id){
	dbPromise.then(function(db) {
		var tx = db.transaction('teams', 'readwrite');
		var store = tx.objectStore('teams');
        return store.get(parseInt(id));
	}).then(function(team) {
		document.getElementById("team-content").innerHTML = teamCard(team);
	  });
}
