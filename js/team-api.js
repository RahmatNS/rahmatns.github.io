var base_url = "https://api.football-data.org/v2/";
// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

function _emptyMatch() {
  return `
  <h5>Upcoming match is empty<h5>
  `;
}


function _matchCard(match) {
  return `
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <div class="center">
              <span class="card-title truncate">${match.competition.name}</span>
              <small>${match.group}</small>
            </div>
            <div class="row">
              <div class="col s5 center-align">
                <h4>${match.homeTeam.name}</h4>
              </div>
              <div class="col s2 center-align">
                <h4>VS</h4>
              </div>
              <div class="col s5 center-align">
                <h4>${match.awayTeam.name}</h4>
              </div>
            </div>
          </div>
          <div class="card-action">
            <a href="./match.html?id=${match.id}">
            Show Details
            </a>
          </div>
        </div>
  `;
}

function getTeamById(matchId) {
  const url = base_url + "teams/" + matchId;
  const myHeaders = new Headers({
    'X-Auth-Token': '01fec1a27e4d40bd9f5032ac3a1f0c2e'
  });
  const myRequest = new Request(url, {
      method: 'GET',
      headers: myHeaders,
      cache: 'no-cache'
    });
  return new Promise(function(resolve, reject) {
    if ("caches" in window) {
      caches.match(url).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            console.log("team-api.js:75.......");
            if(data.crestUrl == null){
              data.crestUrl = "/icon-192.png";
            }
            resolve(data);
          });
        }
      });
    }
    fetch(myRequest)
      .then(status)
      .then(json)
      .then(function(data) {
        console.log("team-api.js:90.......");
        if(data.crestUrl == null){
          data.crestUrl = "/icon-192.png";
        }
        resolve(data);
      });
  });
}