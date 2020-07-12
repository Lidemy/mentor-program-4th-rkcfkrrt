const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});
/* global BigInt */
function solve(line) {
  for (let i = 1; i <= Number(lines[0]); i += 1) {
    const [A, B, C] = line[i].split(' ');
    const a = BigInt(A);
    const b = BigInt(B);
    const c = Number(C);

    if (c === 1) {
      if (a > b) {
        console.log('A');
      } else if (a < b) {
        console.log('B');
      } else {
        console.log('DRAW');
      }
    } else if (c === -1) {
      if (a < b) {
        console.log('A');
      } else if (a > b) {
        console.log('B');
      } else {
        console.log('DRAW');
      }
    }
  }
}

rl.on('line', (line) => {
  lines.push(line);
});

rl.on('close', () => {
  solve(lines);
});
