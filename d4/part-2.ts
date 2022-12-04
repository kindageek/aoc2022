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

const getArrayFromRange = (start: number, end: number) => {
  let arr: number[] = [];
  for (let i = start; i <= end; i++) {
    arr.push(i);
  }
  return arr;
};

console.log(
  rows.filter((row) => {
    const firstArr = getArrayFromRange(row[0][0], row[0][1]);
    const secondArr = getArrayFromRange(row[1][0], row[1][1]);
    return (
      new Set(firstArr.filter((value) => secondArr.includes(value))).size > 0
    );
  }).length
);
