/* eslint-disable consistent-return, quotes, no-unused-vars */
// eslint-disable-next-line
const request = require('request');
const process = require('process');

const args = process.argv;

function listBooks() {
  request(
    `https://lidemy-book-store.herokuapp.com/books?_limit=20`,
    (error, response, body) => {
      if (error) {
        return error;
      }
      const bookData = JSON.parse(body);
      for (let i = 0; i < 20; i += 1) {
        console.log(`${bookData[i].id} ${bookData[i].name}`);
      }
    },
  );
}

function readBooks(id) {
  request(
    `https://lidemy-book-store.herokuapp.com/books/${id}`,
    (error, response, body) => {
      if (error) {
        return console.log('error:', error);
      }
      const bookData = JSON.parse(body);
      console.log(bookData);
    },
  );
}

function deleteBooks(id) {
  request.delete(
    `https://lidemy-book-store.herokuapp.com/books/${id}`,
    (error, response, body) => {
      if (error) {
        return console.log('error:', error);
      }
      console.log(`已刪除 id ${id} 書籍`);
    },
  );
}

function createBooks(name) {
  request.post({
    url: `https://lidemy-book-store.herokuapp.com/books/`,
    form: { name },
  },
  (error) => {
    if (error) {
      return console.log('error:', error);
    }
  },
  console.log(`已新增書籍，名稱為 ${name} `));
}

function updateBooks(id, name) {
  request.patch({
    url: `https://lidemy-book-store.herokuapp.com/books/${id}`,
    form: { name },
  },
  (error) => {
    if (error) {
      return console.log('error:', error);
    }
    console.log(`已更新 id ${id} 書籍名稱為 ${name}`);
  });
}

switch (args[2]) {
  case 'list':
    listBooks();
    break;
  case 'read':
    readBooks(args[3]);
    break;
  case 'delete':
    deleteBooks(args[3]);
    break;
  case 'create':
    createBooks(args[3]);
    break;
  case 'update':
    updateBooks(args[3], args[4]);
    break;
  default:
    console.log('錯誤！');
}
