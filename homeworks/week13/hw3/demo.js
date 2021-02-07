/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-use-before-define */
// eslint-disable-next-line no-unused-vars
const request = new XMLHttpRequest();
const API = 'https://api.twitch.tv/kraken';
const CLIENT_ID = 'ym3xsmqd7ov9bszvkhf2a2t5p8cxzu';
const STREAM_TEMPLATE = `
  <div class="channel">
    <input type="hidden" name="url" value="$channelUrl">
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

getGames();


document.querySelector('.nav__menu').addEventListener('click', (e) => {
  if (e.target.tagName.toLowerCase() === 'li') {
    const gameName = e.target.innerText;
    changeGame(gameName);
  }
});

// 點擊可以新分頁開啟該頻道
$('.streams').delegate('.channel', 'click', (e) => {
  const channelUrl = $(e.target).parent('.channel').children('input').val();
  window.open(`${channelUrl}`);
});

function appendStream(stream) {
  const element = document.createElement('div');
  document.querySelector('.streams').appendChild(element);
  element.outerHTML = STREAM_TEMPLATE
    .replace('$preview', stream.preview.medium)
    .replace('$logo', stream.channel.logo)
    .replace('$status', stream.channel.status)
    .replace('$name', stream.channel.name)
    .replace('$channelUrl', stream.channel.url);
}

async function changeGame(gameName) {
  document.querySelector('.game__chosen').innerText = gameName;
  document.querySelector('.streams').innerHTML = '';
  try {
    const data = await getStreams(gameName);
    for (let i = 0; i < 20; i += 1) {
      appendStream(data.streams[i]);
    }
  } catch (err) {
    console.log(err);
  }
}

async function getGames() {
  const response = await fetch(`${API}/games/top?limit=5`, {
    headers: {
      'Client-ID': CLIENT_ID,
      Accept: 'application/vnd.twitchtv.v5+json',
    },
  });
  const data = await response.json();
  const games = data.top;
  try {
    for (let i = 0; i < 5; i += 1) {
      const element = document.createElement('li');
      element.innerText = games[i].game.name;
      document.querySelector('.nav__menu').appendChild(element);
      element.classList.add('game__name');
    }
    // 顯示第一個遊戲的實況名稱
    changeGame(games[0].game.name);
  } catch (err) {
    console.log(err);
  }
}

async function getStreams(gameName) {
  const response = await fetch(`${API}/streams?game=${encodeURIComponent(gameName)}&limit=20`, {
    headers: {
      'Client-ID': CLIENT_ID,
      Accept: 'application/vnd.twitchtv.v5+json',
    },
  });
  const data = await response.json();
  return data;
}
