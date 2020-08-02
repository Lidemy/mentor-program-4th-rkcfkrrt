const request = require('request');
const process = require('process');

const args = process.argv;
const name = args[2];
const api = 'https://restcountries.eu/rest/v2';

request(
  `${api}/name/${name}`,
  // eslint-disable-next-line
  (error, response, body) => {
    if (error) {
      return console.log('error:', error);
    }
    if (response.statusCode >= 400 && response.statusCode < 500) {
      return console.log('找不到國家資訊');
    }
    const data = JSON.parse(body);
    if (!name) {
      return console.log('請輸入欲查詢之英文國名');
    }
    for (let i = 0; i < data.length; i += 1) {
      console.log('==============');
      console.log(`國家: ${data[i].name}`);
      console.log(`首都: ${data[i].capital}`);
      console.log(`貨幣: ${data[i].currencies[0].code}`);
      console.log(`國碼: ${data[i].callingCodes}`);
    }
  },
);
