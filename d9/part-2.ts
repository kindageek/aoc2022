export const x = '';

const input: string[][] = (await Deno.readTextFile('./input.txt'))
  .split('\n')
  .map((r: string) => r.split(' '));

const start = [0, 0];

const tailPaths: number[][] = [start];

let currHead = start;
let currTails: number[][] = [
  start,
  start,
  start,
  start,
  start,
  start,
  start,
  start,
  start,
];

function diff(a: number, b: number) {
  if (a === b) return 0;
  return a > b ? 1 : -1;
}

function moveTail(index: number) {
  let currTail = currTails[index];
  let prevTail = index === 0 ? currHead : currTails[index - 1];

  if (
    Math.abs(currTail[0] - prevTail[0]) <= 1 &&
    Math.abs(currTail[1] - prevTail[1]) <= 1
  ) {
    return;
  }

  currTail = [
    currTail[0] + diff(prevTail[0], currTail[0]),
    currTail[1] + diff(prevTail[1], currTail[1]),
  ];

  currTails[index] = currTail;

  if (index === currTails.length - 1) {
    tailPaths.push(currTail);
    return;
  }

  moveTail(index + 1);
}

function moveTails() {
  moveTail(0);
}

function moveHeadRight(count: number) {
  for (let i = 0; i < count; i++) {
    currHead = [currHead[0] + 1, currHead[1]];
    moveTails();
  }
}

function moveHeadLeft(count: number) {
  for (let i = 0; i < count; i++) {
    currHead = [currHead[0] - 1, currHead[1]];
    moveTails();
  }
}

function moveHeadUp(count: number) {
  for (let i = 0; i < count; i++) {
    currHead = [currHead[0], currHead[1] + 1];
    moveTails();
  }
}

function moveHeadDown(count: number) {
  for (let i = 0; i < count; i++) {
    currHead = [currHead[0], currHead[1] - 1];
    moveTails();
  }
}

const removeDuplicates = () => {
  const res: { [key: string]: boolean } = {};
  for (let i = 0; i < tailPaths.length; i++) {
    if (!res[`${tailPaths[i]}`]) {
      res[`${tailPaths[i]}`] = true;
    }
  }
  return Object.keys(res).map((key) => key.split(',').map((v) => parseInt(v)));
};

const printPath = () => {
  const lowestX = tailPaths.sort((a, b) => a[0] - b[0])[0][0] * -1;
  const lowestY = tailPaths.sort((a, b) => a[1] - b[1])[0][1] * -1;
  const largestX = tailPaths.sort((a, b) => b[0] - a[0])[0][0];
  const largestY = tailPaths.sort((a, b) => b[1] - a[1])[0][1];

  const width = largestX + lowestX + 1;
  const height = largestY + lowestY + 1;

  let res: string[][] = [];

  for (let i = 0; i < height; i++) {
    res.push([]);
    for (let j = 0; j < width; j++) {
      res[i].push('.');
    }
  }

  for (const [x, y] of tailPaths) {
    res[y + lowestY][x + lowestX] = '#';
  }

  console.log('\n');
  for (const row of res.reverse()) {
    console.log(row.join(' '));
  }
  console.log('\n');
};

function init() {
  for (const [move, count] of input) {
    switch (move) {
      case 'R':
        moveHeadRight(parseInt(count));
        break;
      case 'L':
        moveHeadLeft(parseInt(count));
        break;
      case 'U':
        moveHeadUp(parseInt(count));
        break;
      case 'D':
        moveHeadDown(parseInt(count));
        break;
    }
  }
}

init();

// printPath();
console.log(removeDuplicates().length);
