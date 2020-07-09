const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

function solve(line) {
  const sentence = line.toString();
  const n = sentence.length - 1;
  let counter = '';
  for (let i = n; i >= 0; i -= 1) {
    counter += sentence[i];
  }

  if (sentence === counter) {
    console.log('True');
  } else {
    console.log('False');
  }
}

rl.on('line', (line) => {
  lines.push(line);
});

rl.on('close', () => {
  solve(lines);
});
