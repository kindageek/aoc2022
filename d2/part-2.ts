const input = await Deno.readTextFile("./input.txt");

const rows = input.split("\n").map((row) => row.split(" "));

let count = 0;

// A -> Rock
// B -> Paper
// C -> Scissors

// X -> Lose
// Y -> Draw
// Z -> Win

const dict = {
  A: {
    A: 1 + 3,
    B: 2 + 6,
    C: 3 + 0,
  },
  B: {
    A: 1 + 0,
    B: 2 + 3,
    C: 3 + 6,
  },
  C: {
    A: 1 + 6,
    B: 2 + 0,
    C: 3 + 3,
  },
}

const dict2 = {
  A: {
    X: "C",
    Y: "A",
    Z: "B",
  },
  B: {
    X: "A",
    Y: "B",
    Z: "C",
  },
  C: {
    X: "B",
    Y: "C",
    Z: "A",
  },
}

for (const row of rows) {
  const a = row[0], b = row[1];
  count += dict[a][dict2[a][b]];
}

console.log(count);