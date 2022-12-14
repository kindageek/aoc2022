export const dummy = '';

const input = await Deno.readTextFile('./input.txt');
// const input = await Deno.readTextFile('./test.txt');

type Base = number | number[];
type Node = Base | Base[];

const pairs: any[][][] = input
  .split('\n\n')
  .map(
    (pair: string) =>
      pair.split('\n').map((line) => JSON.parse(line)) as [Node[], Node[]]
  );

const makeArray = (n: Node) => {
  return typeof n === 'number' ? [n] : n;
};

function diff(left: Node, right: Node): boolean | undefined {
  if (Array.isArray(left) && Array.isArray(right)) {
    for (let i = 0; i < left.length && i < right.length; i++) {
      const c = diff(left[i], right[i]);
      if (c !== undefined) {
        return c;
      }
    }

    if (left.length > right.length) return false;
    if (left.length < right.length) return true;
    return undefined;
  } else if (typeof left === 'number' && typeof right === 'number') {
    if (left > right) return false;
    if (left < right) return true;
    return undefined;
  } else {
    return diff(makeArray(left), makeArray(right));
  }
}

let i = 0;
let ans = 0;

for (const [left, right] of pairs) {
  i++;
  if (diff(left as Node, right as Node)) {
    ans += i;
  }
}

console.log(ans)