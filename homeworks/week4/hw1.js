// eslint-disable-next-line
const request = require('request');
const api = 'https://lidemy-book-store.herokuapp.com';

request(
  `${api}/books?_limit=10`,
  // eslint-disable-next-line
  (error, response, body) => {
    const data = JSON.parse(body); // 改用 try catch 會較完善，參考底下所附程式碼
    if (error) {
      return error;
    }
    for (let i = 0; i < data.length; i += 1) {
      console.log(`${data[i].id} ${data[i].name}`);
    }
  },
);

/*
try catch 寫法：

let data
  try {
    data = JSON.parse(body);
  } catch(err) {
    console.log(err);
    return
  }
*/
