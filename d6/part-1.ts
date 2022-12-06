const input = await Deno.readTextFile('./input.txt');

const isUnique = (arr: string[]): boolean => {
  const unique: string[] = [];
  for (const item of arr) {
    if (!unique.includes(item)) {
      unique.push(item);
    }
  }
  return arr.length === unique.length;
} 

const textArr: string[] = input.split('');

for (let i = 3; i < textArr.length; i++) {
  if (isUnique(textArr.slice(i - 3, i + 1))) {
    console.log(textArr.slice(i - 3, i + 1))
    console.log(i + 1);
    break;
  }
}
