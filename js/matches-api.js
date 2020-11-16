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

function fetchMatchesApi() {
  const url = base_url + "matches";
  const myHeaders = new Headers({
    'X-Auth-Token': '01fec1a27e4d40bd9f5032ac3a1f0c2e'
  });
  const myRequest = new Request(url, {
      method: 'GET',
      headers: myHeaders,
      cache: 'no-cache'
    });

  if ("caches" in window) {
    caches.match(url).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          writeMatch(data);
        });
      }
    });
  }
  fetch(myRequest)
    .then(status)
    .then(json)
    .then(function(data) {
      writeMatch(data);
    })
    .catch(error);
}

function writeMatch(data) {
  var content = "";
  data.matches.forEach(function(item) {
    content += _matchCard(item);
  });
  if(data.matches.length == 0){
    content = _emptyMatch();
  }
  document.getElementById("matches").innerHTML = content;
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

function getMatchById(matchId) {
  const url = base_url + "matches/" + matchId;
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
            resolve(data);
          });
        }
      });
    }
    fetch(myRequest)
      .then(status)
      .then(json)
      .then(function(data) {
        resolve(data);
      });
  });
}


function _matchDetail(data) {
  return `
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <div class="center">
              <span class="card-title truncate">${data.match.competition.name}</span>
              <small>${data.match.group}</small>
            </div>

            <div class="row">
              <div class="col s5 center-align">
                <h4>${data.match.homeTeam.name}</h4>
              </div>
              <div class="col s2 center-align">
                <h4>VS</h4>
              </div>
              <div class="col s5 center-align">
                <h4>${data.match.awayTeam.name}</h4>
              </div>
            </div>

            <div class="row">
              <div class="col s6 left-align">
                <p>Wins* : ${data.head2head.homeTeam.wins}</p>
                <p>Draws* : ${data.head2head.homeTeam.draws}</p>
                <p>Losses* : ${data.head2head.homeTeam.losses}</p>
              </div>
              <div class="col s6 right-align">
                <p>Wins* : ${data.head2head.awayTeam.wins}</p>
                <p>Draws* : ${data.head2head.awayTeam.draws}</p>
                <p>Losses* : ${data.head2head.awayTeam.losses}</p>
              </div>
            </div>
          </div>
          <div class="card-action white-text">
            <div class="row">
              <div class="col s3">
                <span>Venue</span>
              </div>
              <div class="col s9">
               <span>${data.match.venue}</span>
              </div>
            </div>

            <div class="row">
              <div class="col s3">
                <span>Status</span>
              </div>
              <div class="col s9">
               <span>${data.match.status}</span>
              </div>
            </div>

            <div class="row">
              <div class="col s3">
                <span>Date</span>
              </div>
              <div class="col s9">
               <span>${data.match.utcDate}</span>
              </div>
            </div>

          </div>

          <div class="card-action white-text">
            <span>*Head To Head</span>
          </div>
        </div>
  `;
}

