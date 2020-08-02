const request = require('request');

const api = 'https://api.twitch.tv/kraken';

request({
  url: `${api}/games/top`,
  headers: {
    'Client-ID': 'ym3xsmqd7ov9bszvkhf2a2t5p8cxzu',
    Accept: 'application/vnd.twitchtv.v5+json',
  },
// eslint-disable-next-line
}, (err, res, body) => {
  if (err) {
    return console.log(err);
  }
  if (res.statusCode >= 200 && res.statusCode < 300) {
    const data = JSON.parse(body);
    const game = data.top;
    for (let i = 0; i < game.length; i += 1) {
      console.log(`${game[i].viewers} ${game[i].game.name}`);
    }
  }
});
