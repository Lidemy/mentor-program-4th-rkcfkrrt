// eslint-disable-next-line
const request = require('request');

request(
  'https://lidemy-book-store.herokuapp.com/books',
  (error, response, body) => {
    const n = JSON.parse(body);
    for (let i = 0; i < 10; i += 1) {
      const book = n[i];
      console.log(`${i + 1} ${book.name}`);
    }
  },
);
