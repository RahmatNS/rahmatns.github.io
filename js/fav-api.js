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

function localFav(){
  dbPromise.then(function(db) {
    var tx = db.transaction('teams', 'readonly');
    var store = tx.objectStore('teams');
    return store.getAll();
  }).then(function(items) {
    document.getElementById("favorite_list").innerHTML = teamList(items);
  });
}

function fetchFavApi() {
  const url = base_url + "competitions?plan=TIER_ONE";
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
          writeTierOne(data);
        });
      }
    });
  }
  fetch(myRequest)
    .then(status)
    .then(json)
    .then(function(data) {
      writeTierOne(data);
    })
    .catch(error);
}

function writeTierOne(data) {
    var compElement = "";
    data.competitions.forEach(function(item) {
      if(item.emblemUrl == null){
        // default image
        item.emblemUrl = "icon-192.png";
      }
      compElement += `
      <div class="col s6 l4">
            <div class="card">
              <a href="./competition.html?id=${item.id}">
                <div class="card-image waves-effect waves-block waves-light">
                  <img class="img-120" src="${item.emblemUrl}"/>
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
    document.getElementById("tier_one").innerHTML = compElement;
}