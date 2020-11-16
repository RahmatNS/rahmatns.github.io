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

function fetchCompetitionApi() {
  const url = base_url + "competitions";
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
      writeCompetitionCard(data);
        });
      }
    });
  }

  fetch(myRequest)
    .then(status)
    .then(json)
    .then(function(data) {
      writeCompetitionCard(data);
    })
    .catch(error);
}

function writeCompetitionCard(data) {
  var compElement = "";
  data.competitions.forEach(function(item) {
    addCompetition(item);
    if(item.emblemUrl == null){
      // default image
      item.emblemUrl = "icon-192.png";
    }
    compElement += `
    <div class="col s6 l4">
          <div class="card">
            <a href="./competition.html?id=${item.id}">
              <div class="card-image waves-effect waves-block waves-light">
                <img class="responsive-img img-120" src="${item.emblemUrl}"/>
              </div>
            </a>
            <div class="card-content">
              <span class="card-title truncate">${item.name}</span>
              <p>${item.area.name}</p>
            </div>
          </div>
    </div>
        `;
  });
  // Sisipkan komponen card ke dalam elemen dengan id #competitions
  document.getElementById("competitions").innerHTML = compElement;
}


function getCompetitionById(compId) {
  const url = base_url + "competitions/" + compId + "/teams";
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
          writeBody(data);
        });
      }
    });
  }

  fetch(myRequest)
    .then(function(response) {
      switch(response.status){
        case 200:
          return Promise.resolve(response);
        case 403:
          document.getElementById("body-content").innerHTML = `
          <h1>Service Error</h1>
          <h4>Failed to retrieve competition record due to api restriction</h4>
          <h6>Please choose another competition record!</h6>
          <small>hint: Competition tier one (on homepage) might work</small>
          `;
        default:
          return Promise.reject(response);
      }
    })
    .then(json)
    .then(function(data) {
      writeBody(data);
    }).catch(function(error) {
      console.log(`Error: ${error.status}`);
    });
}

function writeBody(data) {
  var compElement = `
    <div class="col s6">
        <div class="card">
          <div class="card-content">
            <h1 class="center">${data.competition.name}</h1>
            ${teamList(data.teams)}
          </div>
        </div>
    </div>
      `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = compElement;
}