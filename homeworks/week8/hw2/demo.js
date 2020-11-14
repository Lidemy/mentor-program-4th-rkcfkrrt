/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-use-before-define */
// eslint-disable-next-line no-unused-vars
const request = new XMLHttpRequest();
const API = 'https://api.twitch.tv/kraken';
const CLIENT_ID = 'ym3xsmqd7ov9bszvkhf2a2t5p8cxzu';
const STREAM_TEMPLATE = `
  <div class="channel">
    <img src="$preview" />
    <div class="channel__data">
      <img class="channel__logo" src="$logo" width="50px" />
      <div class="channel__info">
        <div class="channel__status">$status</div>
        <div class="channel__name">$name</div>
      </div>
    </div>
  </div>
`;

getGames((games) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const game of games) {
    const element = document.createElement('li');
    element.innerText = game.game.name;
    document.querySelector('.nav__menu').appendChild(element);
    element.classList.add('game__name');
  }

  // 顯示第一個遊戲的實況名稱
  changeGame(games[0].game.name);
});

document.querySelector('.nav__menu').addEventListener('click', (e) => {
  if (e.target.tagName.toLowerCase() === 'li') {
    const gameName = e.target.innerText;
    changeGame(gameName);
  }
});

function changeGame(gameName) {
  document.querySelector('.game__chosen').innerText = gameName;
  document.querySelector('.streams').innerHTML = '';
  getStreams(gameName, (streams) => {
    for (const stream of streams) {
      appendStream(stream);
    }
  });
}

function appendStream(stream) {
  const element = document.createElement('div');
  document.querySelector('.streams').appendChild(element);
  element.outerHTML = STREAM_TEMPLATE
    .replace('$preview', stream.preview.medium)
    .replace('$logo', stream.channel.logo)
    .replace('$status', stream.channel.status)
    .replace('$name', stream.channel.name);
}

function getGames(callback) {
  request.open('GET', `${API}/games/top?limit=5`, true);
  request.setRequestHeader('Client-ID', CLIENT_ID);
  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      const games = JSON.parse(this.response).top;
      callback(games);
    }
  };
  request.send();
}

function getStreams(gameName, callback) {
  request.open('GET', `${API}/streams?game=${encodeURIComponent(gameName)}`, true);
  request.setRequestHeader('Client-ID', CLIENT_ID);
  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {
      const data = JSON.parse(request.response).streams;
      callback(data);
    }
  };
  request.send();
}

// 自己的寫法
/*
const request = new XMLHttpRequest();
const API = 'https://api.twitch.tv/kraken';
const CLINET_ID = 'ym3xsmqd7ov9bszvkhf2a2t5p8cxzu';
//get top5
const navbar = document.querySelector('.nav__menu')
request.onload = function () {
  if (request.status >= 200 && request.status < 400) {
    const response = request.responseText;
    const json = JSON.parse(response);
    const gamesTop = json.top;
    //console.log('gamesTop:', gamesTop);
    for(let i = 0; i < gamesTop.length; i += 1) {
      const li = document.createElement('li')
      const gamesData = gamesTop[i].game
      li.innerHTML = `${gamesData.name}`
      li.classList.add('game__name')
      navbar.appendChild(li);
    }

    document.querySelector('.nav__menu').addEventListener('click', e => {
      //const element = e.target.closest('.game__name')
      if (e.target.classList.contains('game__name')) {
        const element = e.target.innerHTML
        document.querySelector('.game__chosen').innerHTML = `${element}`;
        //console.log ('element:', element);
        const popularLive = new XMLHttpRequest();
        popularLive.onload = function () {
          const popularLive__response = popularLive.responseText;
          const popularLive__json = JSON.parse(popularLive__response);
          //console.log ('popularLive__json:', popularLive__json);
          document.querySelector('.streams').innerHTML = '';

          //輸出 20 個
          const container = document.querySelector('.streams')
          for(let j = 0; j < 20; j += 1) {
            const div = document.createElement('div')
            const streamsData = popularLive__json.streams[j]
            div.innerHTML = `
              <img src="${streamsData.preview.medium}" />
              <div class="channel__data">
                <img class="channel__logo" src="${streamsData.channel.logo}" width="50px" />
                <div class="channel__info">
                  <div class="channel__status">${streamsData.channel.status}</div>
                  <div class="channel__name">${streamsData.channel.display_name}</div>
                </div>
              </div>
            `
            div.classList.add('channel')
            container.appendChild(div);
          }
        }
        popularLive.open('GET', `${API}/streams/?game=${element}&limit=20`, true);
        popularLive.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
        popularLive.setRequestHeader("Client-ID", CLINET_ID);
        popularLive.send();
      }
    });
  } else {
    console.log('err:', request.status);
  }
}
request.open('GET', `${API}/games/top?limit=5`, true);
request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
request.setRequestHeader("Client-ID", CLINET_ID);
request.send();
*/
