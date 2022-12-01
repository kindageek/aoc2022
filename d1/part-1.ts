const input = await Deno.readTextFile("./input.txt");

const values = input.split("\n").map((n) => parseInt(n, 10));

const calories: number[] = [];
let sum = 0;

values.forEach((value) => {
  if (isNaN(value)) {
    calories.push(sum);
    sum = 0;
  } else {
    sum += value;
  }
})

console.log(Math.max(...calories));