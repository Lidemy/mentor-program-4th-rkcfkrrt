const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

function solve(line) {
  const N = Number(line[0]);
  let result = '';
  for (let i = 1; i <= N; i += 1) {
    result += '*';
    console.log(result);
  }
}

rl.on('line', (line) => {
  lines.push(line);
});

rl.on('close', () => {
  solve(lines);
});
