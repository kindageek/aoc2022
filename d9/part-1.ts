export const x = '';

const input: string[][] = (await Deno.readTextFile('./input.txt'))
  .split('\n')
  .map((r: string) => r.split(' '));

const start = [0, 0];

const tailPaths: number[][] = [start];

let currHead = start;
let currTail = start;

function diff(a: number, b: number) {
  if (a === b) return 0;
  return a > b ? 1 : -1;
}

function moveTail() {
  if (
    Math.abs(currTail[0] - currHead[0]) <= 1 &&
    Math.abs(currTail[1] - currHead[1]) <= 1
  ) {
    return;
  }

  currTail = [
    currTail[0] + diff(currHead[0], currTail[0]),
    currTail[1] + diff(currHead[1], currTail[1]),
  ];

  tailPaths.push(currTail);
}

function moveHeadRight(count: number) {
  for (let i = 0; i < count; i++) {
    currHead = [currHead[0] + 1, currHead[1]];
    moveTail();
  }
}

function moveHeadLeft(count: number) {
  for (let i = 0; i < count; i++) {
    currHead = [currHead[0] - 1, currHead[1]];
    moveTail();
  }
}

function moveHeadUp(count: number) {
  for (let i = 0; i < count; i++) {
    currHead = [currHead[0], currHead[1] + 1];
    moveTail();
  }
}

function moveHeadDown(count: number) {
  for (let i = 0; i < count; i++) {
    currHead = [currHead[0], currHead[1] - 1];
    moveTail();
  }
}

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

const removeDuplicates = (list: number[][]) => {
  const res: { [key: string]: boolean } = {};
  for (let i = 0; i < list.length; i++) {
    if (!res[`${list[i]}`]) {
      res[`${list[i]}`] = true;
    }
  }
  return Object.keys(res);
};

console.log(removeDuplicates(tailPaths).length);
