const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

function solve(line) {
  for (let i = 1; i < line.length; i += 1) {
    const n = Number(line[i]);
    const factor = [];
    for (let j = 1; j <= n; j += 1) {
      const k = n % j;
      if (k === 0) {
        factor.push(j);
      }
    }
    if (factor.length === 2) {
      console.log('Prime');
    } else {
      console.log('Composite');
    }
  }
}

rl.on('line', (line) => {
  lines.push(line);
});

rl.on('close', () => {
  solve(lines);
});
