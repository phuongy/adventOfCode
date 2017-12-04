const input1 = 1;
const input2 = 12;
const input3 = 23;
const input4 = 1024;
const input5 = 265149;

const getSquare = input => {
  let size = 1;
  while (input > Math.pow(size * 2 - 1, 2)) size++;
  return size;
};

const part1 = input => {
  const square = getSquare(input);
  const offset = square > 1 ? Math.pow((square - 1) * 2 - 1, 2) : 0;
  const radius = square;
  const edge = square > 1 ? radius * 2 - 1 : 0;
  const midpoint = square > 1 ? (edge + 1) / 2 : 0;
  const start = input % (edge - 1);

  // edge case for when start = 0
  if (start === 0) {
    return Math.abs(midpoint - edge + 1) + radius - 1;
  }

  const distance = Math.abs(midpoint - start) + radius - 1;
  return distance > 0 ? distance : 0;
};

console.log('input1:', part1(input1));
console.log('input2:', part1(input2));
console.log('input3:', part1(input3));
console.log('input4:', part1(input4));
console.log('input5:', part1(input5));
