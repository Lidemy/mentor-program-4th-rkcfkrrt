const readline = require('readline');

const lines = [];
const rl = readline.createInterface({
  input: process.stdin,
});

function digitsCount(n) {
  let result = 0;
  while (n !== 0) {
    // eslint-disable-next-line
    n = Math.floor(n / 10);
    result += 1;
  }
  return result;
}

function narcissistic(n) {
  let m = n;
  const digits = digitsCount(m);
  let sum = 0;
  while (m !== 0) {
    const number = m % 10;
    sum += number ** digits;
    m = Math.floor(m / 10);
  }
  return (sum === n);
}

function solve(line) {
  const temp = line[0].split(' ');
  const n = Number(temp[0]);
  const m = Number(temp[1]);
  for (let i = n; i <= m; i += 1) {
    if (narcissistic(i)) {
      console.log(i);
    }
  }
}

rl.on('line', (line) => {
  lines.push(line);
});

rl.on('close', () => {
  solve(lines);
});

/*
function flower(a) {
  const str = a.toString();
  let sum = 0;
  for (let i = 0; i <= str.length - 1; i += 0) {
    sum += str[i] ** str.length;
  }
  return sum;
}

function solve(line) {
  const temp = line[0].split(' ');
  const n = Number(temp[0]);
  const m = Number(temp[1]);
  for (let i = n; i <= m; i += 1) {
    if (i === flower(i)) {
      console.log(i);
    }
  }
}
 */
