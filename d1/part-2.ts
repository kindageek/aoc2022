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

const topThree = calories.sort((a, b) => b - a).slice(0, 3);
console.log(topThree);
console.log(topThree.reduce((sum, value) => sum + value, 0));