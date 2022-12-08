export const x = '';

const input: number[][] = (await Deno.readTextFile('./input.txt'))
  .split('\n')
  .map((r: string) => r.split('').map((i) => parseInt(i)));

let data: number[][] = [];

const isVisible = (i: number, j: number) => {
  if (i === 0 || i === input.length - 1 || j === 0 || j === input[i].length - 1)
    return true;

  const value = input[i][j];

  const visibles: boolean[] = [true, true, true, true];

  for (let k = 0; k < i; k++) {
    if (input[k][j] >= value) {
      visibles[0] = false;
      break;
    }
  }

  for (let k = i + 1; k < input.length; k++) {
    if (input[k][j] >= value) {
      visibles[1] = false;
      break;
    }
  }

  for (let k = 0; k < j; k++) {
    if (input[i][k] >= value) {
      visibles[2] = false;
      break;
    }
  }

  for (let k = j + 1; k < input.length; k++) {
    if (input[i][k] >= value) {
      visibles[3] = false;
      break;
    }
  }

  return visibles.filter((v) => v === true).length > 0;
};

for (let i = 0; i < input.length; i++) {
  data.push([]);
  for (let j = 0; j < input[i].length; j++) {
    data[i].push(isVisible(i, j) ? 1 : 0);
  }
}

console.log(input);
console.log(data);

console.log(
  data.reduce((sum, row) => sum + row.filter((v) => v === 1).length, 0)
);
