export const dummy = '';

const input = await Deno.readTextFile('./input.txt');
// const input = await Deno.readTextFile('./test.txt');

const grid: string[][] = input.split('\n').map((row: string) => row.split(''));

const height = grid.length;
const width = grid[0].length;

const letterToNumber = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26,

  S: 1,
  E: 26,
};

interface Point {
  x: number;
  y: number;
}

const path: string[][] = new Array(height).fill(new Array(width).fill('.'));

const numberGrid = grid.map((row) =>
  row.map((tile) => letterToNumber[tile as keyof typeof letterToNumber])
);

const getInitPositions = (): Point[] => {
  let start: Point = { x: 0, y: 0 };
  let end: Point = { x: 0, y: 0 };

  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (grid[i][j] === 'S') start = { x: j, y: i };
      if (grid[i][j] === 'E') end = { x: j, y: i };
    }
  }

  return [start, end];
};

const [start, end] = getInitPositions();

const allValidMoves = (point: Point) => {
  const { x, y } = point;

  const elevation = numberGrid[y][x];

  const allMoves = [
    { x: x - 1, y }, // left
    { x: x + 1, y }, // right
    { x, y: y - 1 }, // down
    { x, y: y + 1 }, // up
  ];

  return allMoves.filter((move) => {
    const { x: x2, y: y2 } = move;

    if (x2 < 0 || y2 < 0) return false;
    if (x2 >= numberGrid[0].length || y2 >= numberGrid.length) return false;

    const elevation2 = numberGrid[y2][x2];

    return elevation2 <= elevation + 1;
  });
};

const pointToString = (point: Point) => `${point.x},${point.y}`;

const allVisitedPoints: Set<string> = new Set([pointToString(start)]);
let incompletePaths: Point[][] = [[start]];

while (incompletePaths.length > 0) {
  const newIncompletePaths: Point[][] = [];

  for (const incompletePath of incompletePaths) {
    const lastPoint = incompletePath[incompletePath.length - 1];
    const validMoves = allValidMoves(lastPoint);

    for (const move of validMoves) {
      if (allVisitedPoints.has(pointToString(move))) continue;

      allVisitedPoints.add(pointToString(move));

      const newIncompletePath = [...incompletePath];
      newIncompletePath.push(move);

      if (move.x === end.x && move.y === end.y) {
        console.log(newIncompletePath.length - 1);
        Deno.exit();
      } else {
        newIncompletePaths.push(newIncompletePath);
      }
    }
  }

  incompletePaths = newIncompletePaths;
}

console.log(start, end);
