export const dummy = '';

const lines: string[][] = (await Deno.readTextFile('./input2.txt'))
  .split('\n')
  .map((r: string) => r.split(' '));

let sum = 0;
let x = 1;
let cycleCount = 0;

function cycle() {
  cycleCount += 1;
  if ((cycleCount - 20) % 40 === 0) {
    sum += cycleCount * x;
  }
}

lines.forEach((line) => {
  cycle();
  if (line.length === 2) {
    cycle();
    x += parseInt(line[1]);
  }
});

console.log(sum);
