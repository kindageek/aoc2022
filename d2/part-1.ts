const input = await Deno.readTextFile("./input.txt");

const rows = input.split("\n").map((row) => row.split(" "));

let count = 0;

// A -> Rock
// B -> Paper
// C -> Scissors

// X -> Rock
// Y -> Paper
// Z -> Scissors

const dict = {
  A: {
    X: 1 + 3,
    Y: 2 + 6,
    Z: 3 + 0,
  },
  B: {
    X: 1 + 0,
    Y: 2 + 3,
    Z: 3 + 6,
  },
  C: {
    X: 1 + 6,
    Y: 2 + 0,
    Z: 3 + ,
  },
}

for (const row of rows) {
  const a = row[0], b = row[1];
  count += dict[a][b];
}

console.log(count);