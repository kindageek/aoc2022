const input = await Deno.readTextFile('./input.txt');

const rows: string[][] = input
  .split('\n')
  .map((row: string) => row.split(""));

const data: string[][][][] = [];

for (let i = 0; i < rows.length - 2; i += 3) {
  data.push([rows[i], rows[i + 1], rows[i + 2]]);
}

let res: string[] = [];

for (const [first, second, third] of data) {
  const common = first.filter((char) => second.indexOf(char) !== -1).filter((char) => third.indexOf(char) !== -1);
  res = res.concat([...new Set(...common)]);
}

const nums = res.map((char) => {
  const code = char.charCodeAt(0);
  if (code >= 97 && code <= 122) {
    return code - 96;
  }
  if (code >= 65 && code <= 90) {
    return code - 64 + 26;
  }
  return code;
});

console.log(nums.reduce((sum, value) => sum + value, 0));
