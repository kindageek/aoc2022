const input = await Deno.readTextFile('./input.txt');

const printArr = (arr: string[][]) => {
  console.log("[")
  for (const row of arr) {
    console.log("\t[" + (row.length == 0 ? ' ' : row.map((v) => v === '' ? ' ' : v).join("] [")) + "]");
  }
  console.log("]")
}

const removeDuplicatesBetween = (list: string[]) => {
  const res: string[] = [];
  for (let i = 0; i < list.length; i++) {
    if (list[i] !== '') {
      res.push(list[i]);
    } else {
      if (list[i + 1] === '' && list[i + 2] === '' && list[i + 3] === '') {
        res.push(list[i]);
        i += 3;
      }
    }
  }
  return res;
};

const rows = input
  .split('\n')
  .map((row: string) =>
    row
      .split(' ')
      .map((v: string) => v.trim().replace('[', '').replace(']', ''))
  )
  .filter((row: string[]) => row.length > 0);

let containers: string[][] = [];
let commands: number[][] = [];
let size: number = 0;

for (let i = 0; i < rows.length; i++) {
  if (rows[i].length === 1 && rows[i][0].length === 0) {
    size = rows[i - 1].filter((v) => v.length > 0).length;
    containers = rows
      .slice(0, i - 1)
      .reverse()
      .map((row: string[]) => removeDuplicatesBetween(row));
    commands = rows
      .slice(i + 1)
      .map((command: string[]) => [
        parseInt(command[1]),
        parseInt(command[3]) - 1,
        parseInt(command[5]) - 1,
      ]);
    break;
  }
}

const transpose = (arr: string[][]) => {
  let list = arr.slice();
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < i; j++) {
      const tmp = list[i][j];
      list[i][j] = list[j][i];
      list[j][i] = tmp;
    }
  }
  return list;
};

printArr(containers);

const isSquare = containers.length === containers[0].length;
if (!isSquare) {
  containers.push(new Array(size).fill(''));
}

let stacks = transpose(containers);
if (!isSquare) {
  stacks = stacks.map((row) => row.slice(0, row.length - 1));
}
stacks = stacks.map((row) => {
  while (row[row.length - 1] === '') {
    row.pop();
  }
  return row;
});
printArr(stacks)

for (const [count, from, to] of commands) {
  for (let i = 0; i < count; i++) {
    stacks[to].push(stacks[from].pop());
  }
}

printArr(stacks)

console.log(
  stacks.reduce((res, stack) => res + (stack.length > 0 ? stack[stack.length - 1] : ''), '')
);
