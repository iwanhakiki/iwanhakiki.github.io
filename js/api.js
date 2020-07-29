let base_url = "https://api.football-data.org/v2/";


function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    
    return Promise.reject(new Error(response.statusText));
  } else {
    
    return Promise.resolve(response);
  }
}

function json(response) {
  return response.json();
}

function error(error) {
  
  console.log("Error : " + error);
}

//Fungsi get Teams
function domTeams(data) {
  let teamsHTML = "";
  data.standings[0].table.forEach(function(league) {
    crest = league.team.crestUrl.replace(/^http:\/\//i, 'https://');
    teamsHTML += `
      <div class="col s12 m6 l4">
        <div class="card small">  
        <div class="card-image waves-effect waves-block waves-light">
          <img src="${crest}" alt="${league.team.name}" />
        </div>
        <div class="card-content">
          <h3 class="card-title truncate center">${league.team.name}</h3>
          <p class="center"><a href="./team.html?id=${league.team.id}">Team Detail</a>
        </div>
       </div>
      </div>
    `;
    });
      
  document.getElementById("teams").innerHTML = teamsHTML;
}

function getTeams() {

  if ('caches' in window) {
    caches.match(base_url + "competitions/2014/standings").then(function(response) {
      if (response) {
        response.json().then(function (data) {
          domTeams(data);
        })
      }
    })
  }


  fetch(base_url + "competitions/2014/standings", {
    headers: {
      'X-Auth-Token': "	d1d846328eff4ba4bcc98cc05a9d0a5f"
    }
  })
    .then(status)
    .then(json)
    .then(function(data) {
      domTeams(data);
    })
    .catch(error);
}

//Fungsi get Team By Id
function domTeamById(data) {
  let teamDataHTML = "";
  crest = data.crestUrl.replace(/^http:\/\//i, 'https://');
    teamDataHTML += `
      <img src="${crest}" alt="${data.name}" />
      <table style="align: center;">
        <tr>
          <th>Name</th>
          <td>${data.name}</td>
        </tr>
        <tr>
          <th>Club Colors</th>
          <td>${data.clubColors}</td>
        </tr>
        <tr>
          <th>Founded</th>
          <td>${data.founded}</td>
        </tr>
        <tr>
          <th>Venue</th>
          <td>${data.venue}</td>
        </tr>
        <tr>
          <th>Address</th>
          <td>${data.address}</td>
        </tr>
        <tr>
          <th>Email</th>
          <td>${data.email}</td>
        </tr>
        <tr>
          <th>Phone</th>
          <td>${data.phone}</td>
        </tr>
      </table>
    `;
  document.getElementById("teamData").innerHTML = teamDataHTML;
}

function getTeamById() {
  return new Promise(function(resolve, reject){
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");

  if ('caches' in window) {
    caches.match(base_url + "teams/" + idParam).then(function(response) {
      if (response) {
        response.json().then(function (data) {
          domTeamById(data);
          resolve(data);
        });
      }
    });
  }

  fetch(base_url + "teams/" + idParam, {
    headers: {
      'X-Auth-Token': "	d1d846328eff4ba4bcc98cc05a9d0a5f"
    }
  })
    .then(status)
    .then(json)
    .then(function(data) {
      console.log(data);
      domTeamById(data);
      resolve(data);
    });
  })
}

//Fungsi get Matches
function domMatch(data) {
  let matchesHTML = "";
    data.matches.forEach(function(match) {
    matchesHTML += `
      <tr>
        <td>${match.homeTeam.name}</td>
        <td>${match.awayTeam.name}</td>
        <td>${match.matchday}</td>
        <td>${match.status}</td>
        <td><a href="./match.html?id=${match.id}">Detail</a></p></td>
      </tr>
    `;  
    document.getElementById("matches").innerHTML = matchesHTML;
  });
}
function getMatch() {
  if ('caches' in window) {
    caches.match(base_url + "competitions/2014/matches?matchday=38").then(function(response) {
      if (response) {
        response.json().then(function (data) {
          console.log(data);
          domMatch(data);
        })
      }
    })
  }

  fetch(base_url + "competitions/2014/matches?matchday=38", {
    headers: {
      'X-Auth-Token': "	d1d846328eff4ba4bcc98cc05a9d0a5f"
    }
  })
    .then(status)
    .then(json)
    .then(function(data) {
      console.log(data);
      domMatch(data);
    });
}

//Fungsi get Match By Id
function domMatchById(data) {
  let matchesHTML = "";
    matchesHTML += `
      <h3 style="margin-top: 3%; text-align: center;">Detail</h3>
      <table style="text-align: center;">
        <tr>
          <th>Competition</th>
          <th>Home</th>
          <th>Away</th>
          <th>Group</th>
          <th>Venue</th>
        </tr>
        <tr>
          <td>${data.match.competition.name}</td>
          <td>${data.match.homeTeam.name}</td>
          <td>${data.match.awayTeam.name}</td>
          <td>${data.match.group}</td>
          <td>${data.match.venue}</td>
        </tr>
      </table>
      <h3 style="margin-top: 3%; text-align: center;">Score</h3>
      <table>
        <tr>
          <th></th>
          <th>Home</th>
          <th>Away</th>
        </tr>
        <tr>
          <th>Half Time</th>
          <td>${data.match.score.halfTime.homeTeam}</td>
          <td>${data.match.score.halfTime.awayTeam}</td>
        </tr>
        <tr>
          <th>Full Time</th>
          <td>${data.match.score.fullTime.homeTeam}</td>
          <td>${data.match.score.fullTime.awayTeam}</td>
        </tr>
      </table>
    `;
      
  document.getElementById("matches").innerHTML = matchesHTML;
}

function getMatchById() {
  return new Promise(function(resolve, reject){
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");

  if ('caches' in window) {
    caches.match(base_url + "matches/" + idParam).then(function(response) {
      if (response) {
        response.json().then(function (data) {
          domMatchById(data);
          resolve(data);
        });
      }
    });
  }

  fetch(base_url + "matches/" + idParam, {
    headers: {
      'X-Auth-Token': "	d1d846328eff4ba4bcc98cc05a9d0a5f"
    }
  })
    .then(status)
    .then(json)
    .then(function(data) {
      console.log(data);
      domMatchById(data);
      resolve(data);
    });
  });
}

//Fungsi get Standings/Classement
function domClassement(data) {
  let teamsHTML = "";
    data.standings[0].table.forEach(function(league) {
      teamsHTML += `
        <tr>
          <td>${league.position}</td>
          <td>${league.team.name}</td>
          <td>${league.won}</td>
          <td>${league.draw}</td>
          <td>${league.lost}</td>
          <td>${league.playedGames}</td>
        </tr>
      `;
    });    
  document.getElementById("classement").innerHTML = teamsHTML;
}

function getClassement() {
  
  if ('caches' in window) {
    caches.match(base_url + "competitions/2014/standings").then(function(response) {
      if (response) {
        response.json().then(function (data) {
          domClassement(data);
        })
      }
    })
  }

  fetch(base_url + "competitions/2014/standings", {
    headers: {
      'X-Auth-Token': "	d1d846328eff4ba4bcc98cc05a9d0a5f"
    }
  })
    .then(status)
    .then(json)
    .then(function(data) {
      console.log(data.standings[0]);
      domClassement(data);
    })
    .catch(error);
}

//Fungsi get Saved Teams
function domSavedTeams(teams) {
  let teamsHTML = "";
    teams.forEach(function(team) {
      crest = team.crestUrl.replace(/^http:\/\//i, 'https://');
      teamsHTML += `
        <div class="col s12 m6 l4">
          <div class="card small">  
            <div class="card-image waves-effect waves-block waves-light">
              <img src="${crest}" alt="${team.name}" />
            </div>
            <div class="card-content">
              <h3 class="card-title truncate center">${team.name}</h3>
              <p class="center"><a href="./team.html?id=${team.id}&saved=true">Team Detail</a>
            </div>
          </div>
        </div>
      `;
    }); 
  document.getElementById("teams").innerHTML = teamsHTML;
}

function getSavedTeams() {
  getAll().then(function(teams) {
    console.log(teams);
    
    let noData = "";
    noData += `<h5>Tidak Ada Data Yang Disimpan</h5>`;

    if(teams == 0){
      document.getElementById("teams").innerHTML = noData;
    } else {
      domSavedTeams(teams);
    }
  });
}

//Fungsi get SAved Team By Id
function domSavedTeamById(team) {
  let teamDataHTML = "";
  crest = team.crestUrl.replace(/^http:\/\//i, 'https://');
    teamDataHTML += `
      <img src="${crest}" alt="${team.name}" />
      <table style="align: center;">
        <tr>
          <th>Name</th>
          <td>${team.name}</td>
        </tr>
        <tr>
          <th>Club Colors</th>
          <td>${team.clubColors}</td>
        </tr>
        <tr>
          <th>Founded</th>
          <td>${team.founded}</td>
        </tr>
        <tr>
          <th>Venue</th>
          <td>${team.venue}</td>
        </tr>
        <tr>
          <th>Address</th>
          <td>${team.address}</td>
        </tr>
        <tr>
          <th>Email</th>
          <td>${team.email}</td>
        </tr>
        <tr>
          <th>Phone</th>
          <td>${team.phone}</td>
        </tr>
      </table>
    `;  
  document.getElementById("teamData").innerHTML = teamDataHTML;
}

function getSavedTeamById() {
  let urlParams = new URLSearchParams(window.location.search);
  let idParam = urlParams.get("id");
  
  getById(idParam).then(function(team) {
    console.log(team);
    domSavedTeamById(team);
  });
}