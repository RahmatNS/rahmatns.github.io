function teamList(teams){
  if(teams.length == 0){
    return `
        <div class="center">
          <span>No data available</span>
        </div>
    `;
  }
  var teamsView = "";
  teams.forEach(function(team){
    if(team.crestUrl == null){
      team.crestUrl = "/icon-192.png";
    }

    var page = window.location.hash.substr(1);
    console.log(page);
    teamsView += `
    <div class="card">
      <div class="card-content" style="min-height:150px">
        <div class="row">
          <div class="col s2">
            <img class="responsive-img" src="${team.crestUrl}"/>
          </div>
          <div class="col s10">
            <span class="card-title">${team.name}</span>
            <a href="${team.website}">${team.website}</a>
            <span class="card-title">${team.address}</span>
          </div>
        </div>
      </div>
      <div class="card-action">
        <a href="/team.html?id=${team.id}${page === 'favorite' ? '&saved=1' : ''}">Show Details</a>
        ${page === 'favorite' ? _buttonDelete(team.id): ''}
      </div>
    </div>
    `;
  });
  return teamsView;
}

function _buttonDelete(team_id) {
  return `
        <button class="btn waves-effect waves-light red" onClick="_deleteFav(${team_id})">Delete</button>
        `;
}

async function _deleteFav(teamId){
  await deleteTeam(teamId);
  location.reload();
}

function teamCard(team) {
  console.log("component.js:34..........");
  console.log(team);
  return `
          <div class="card">
            <div class="card-image">
              <img src="${team.crestUrl}" height="200px"/>
            </div>
            <div class="card-content center">
              <h1>${team.name}</h1>
              ${coachView(team.squad)}
            </div>
            <div class="card-action">
              <div class="container">
                ${squadList(team.squad)}
              </dvi>
            </div>
          </div>
        `;
}

function squadList(squads) {
  var content = `
  <div class="row">
    <div class="container">
      <div class="card">
        <div class="card-content center">
          <h4>PLAYER</h4>
        </div>
      </div>
      </div>
  `;
  squads.forEach(function(item) {
    if(item.role === "PLAYER"){
      content += _squadItem(item);
    }
  });
  content += `
    </div>
  </div>
  `;
  return content;
}

function coachView(squads) {
  var content = "";
  squads.forEach(function(item) {
    if(item.role === "COACH"){
      content += _coachView(item); 
    }
  });
  return content;
}

function _coachView(data) {
  return `
  <h4>Coach: ${data.name}</h4>
  `;
}


function _squadItem(data) {
  return `
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <div class="center">
              <h4>${data.name}</h4>
              <h3>${data.position}</h3>
            </div>
          </div>
        </div>
  `;
}
