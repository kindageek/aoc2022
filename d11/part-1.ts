export const dummy = '';

const input = await Deno.readTextFile('./input.txt');
// const input = await Deno.readTextFile('./test.txt');

const lines: string[][] = input.split('\n\n').map((line: string) =>
  line
    .split('\n')
    .slice(1)
    .map((l: string) => l.trim().split(': ')[1])
);

interface Note {
  items: number[];
  operation: {
    op: string;
    value: number | 'old';
  };
  testValue: number;
  caseTrueIndex: number;
  caseFalseIndex: number;
}

const ROUNDS = 20;

const notes: Note[] = lines.map((line) => {
  return {
    items: line[0].split(', ').map((v) => parseInt(v)),
    operation: {
      op: line[1].split(' ')[3],
      value:
        line[1].split(' ')[4] === 'old'
          ? 'old'
          : parseInt(line[1].split(' ')[4]),
    },
    testValue: parseInt(line[2].split(' ')[2]),
    caseTrueIndex: parseInt(line[3].split(' ')[3]),
    caseFalseIndex: parseInt(line[4].split(' ')[3]),
  };
});

const inspections: number[] = new Array(lines.length).fill(0);

for (let i = 0; i < ROUNDS; i++) {
  notes.forEach(
    ({ items, operation, testValue, caseTrueIndex, caseFalseIndex }, index) => {
      items.forEach((item) => {
        inspections[index]++;
        const value = operation.value === 'old' ? item : operation.value;
        const worryLevel = Math.floor(
          (operation.op === '*' ? item * value : item + value) / 3
        );
        if (worryLevel % testValue === 0) {
          notes[caseTrueIndex].items.push(worryLevel);
        } else {
          notes[caseFalseIndex].items.push(worryLevel);
        }
        const [_, ...rest] = notes[index].items;
        notes[index].items = rest;
      });
    }
  );
}

notes.forEach(({ items }, index) => {
  console.log(`Monkey ${index}:`, items.join(', '));
});
console.log(
  inspections
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((sum, value) => sum * value, 1)
);
