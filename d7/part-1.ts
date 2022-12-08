const MAX_SIZE = 100000;

interface Dir {
  parent?: Dir;
  dirs: { [key: string]: Dir };
  files: { [key: string]: number };
}

const input: string[] = (await Deno.readTextFile('./input.txt')).split('\n');

const fs: Dir = { dirs: {}, files: {} };

let current = fs;

for (const row of input) {
  const [cmd, ...rest] = row.split(' ');
  switch (cmd) {
    case '$':
      if (rest[0] === 'cd') {
        if (rest[1] === '..') {
          current = current.parent;
        } else if (rest[1] === '/') {
          current = fs;
        } else {
          const dir = rest[1];
          if (!current.dirs[dir]) {
            current.dirs[dir] = { parent: current, dirs: {}, files: {}};
          }
          current = current.dirs[dir];
        }
      }
      break;
    case 'dir':
      break;
    default:
      current.files[rest[0]] = parseInt(cmd);
      break;
  }
}

const sizes: number[] = [];

const dirSize = (dir: Dir): number => {
  let size = 0;
  for (const filename of Object.keys(dir.files)) {
    size += dir.files[filename];
  }
  for (const dirName of Object.keys(dir.dirs)) {
    const dSize = dirSize(dir.dirs[dirName]);
    sizes.push(dSize);
    size += dSize;
  }
  return size;
}

dirSize(fs);

console.log(sizes.filter((size) => size <= MAX_SIZE).reduce((a,b) => a + b, 0));