export const dummy = '';

const input = await Deno.readTextFile('./input.txt');
// const input = await Deno.readTextFile('./test.txt');

type Base = number | number[];
type Node = Base | Base[];

const pairs: any[][][] = input
  .split('\n')
  .filter((line) => line !== '')
  .map((line) => JSON.parse(line));

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

let first = -1;
let second = -1;

[...pairs, ...[[[2]], [[6]]]]
  .sort((a, b) => (diff(a, b) === undefined ? 0 : diff(a, b) ? -1 : 1))
  .forEach((arr, i) => {
    if (JSON.stringify(arr) === JSON.stringify([[2]])) {
      console.log(i + 1);
      first = i + 1;
    }
    if (JSON.stringify(arr) === JSON.stringify([[6]])) {
      console.log(i + 1);
      second = i + 1;
    }
  });

console.log(first * second);
