const input = await Deno.readTextFile('./input.txt');

const rows: number[][][] = input
  .split('\n')
  .map((row: string) =>
    row
      .split(',')
      .map((item: string) =>
        item.split('-').map((value) => parseInt(value, 10))
      )
  );

const contains = (a: number[], b: number[]) => {
  return a[0] >= b[0] && a[1] <= b[1];
};

console.log(
  rows.filter((row) => contains(row[0], row[1]) || contains(row[1], row[0]))
    .length
);
