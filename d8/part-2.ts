export const x = '';

const input: number[][] = (await Deno.readTextFile('./input2.txt'))
  .split('\n')
  .map((r: string) => r.split('').map((i) => parseInt(i)));

let data: number[][] = [];

const score = (i: number, j: number) => {
  if (i === 0 || i === input.length - 1 || j === 0 || j === input[i].length - 1)
    return 0;

  const value = input[i][j];
  const visibleTrees: number[] = [0, 0, 0, 0];

  for (let k = i - 1; k >= 0; k--) {
    visibleTrees[0]++;
    if (input[k][j] >= value) break;
  }

  for (let k = i + 1; k < input.length; k++) {
    visibleTrees[1]++;
    if (input[k][j] >= value) break;
  }

  for (let k = j - 1; k >= 0; k--) {
    visibleTrees[2]++;
    if (input[i][k] >= value) break;
  }

  for (let k = j + 1; k < input[i].length; k++) {
    visibleTrees[3]++;
    if (input[i][k] >= value) break;
  }

  return visibleTrees
    .filter((val) => val !== 0)
    .reduce((sum, val) => sum * val, 1);
};

for (let i = 0; i < input.length; i++) {
  data.push([]);
  for (let j = 0; j < input[i].length; j++) {
    data[i].push(score(i, j));
  }
}

console.log(input);
console.log(data);

console.log(Math.max(...data.map((r) => Math.max(...r))));
