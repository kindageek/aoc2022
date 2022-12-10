export const dummy = '';

const lines: string[][] = (await Deno.readTextFile('./input.txt'))
  .split('\n')
  .map((r: string) => r.split(' '));

let x = 1;
const instructions: number[] = [];
const grid: string[][] = Array.from({ length: 6 }, () =>
  new Array(40).fill(' ')
);

lines.forEach((line) => {
  instructions.push(0);
  if (line.length === 2) {
    instructions.push(parseInt(line[1]));
  }
});

instructions.forEach((ins, index) => {
  const [dx, dy] = [index % 40, Math.floor(index / 40)];
  const shouldPaint = dx === x || dx === x - 1 || dx === x + 1;
  grid[dy][dx] = shouldPaint ? '#' : ' ';
  x += ins;
});

grid.forEach((row) => {
  console.log(row.join(' '));
});
