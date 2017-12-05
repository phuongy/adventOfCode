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

const part2 = input => {
  const createGrid = (grid, radius) => {
    if (radius === 1) {
      return [{ index: 1, radius: 1, position: 1 }];
    }

    const end = Math.pow(radius, 2);
    const start = Math.pow(radius - 2, 2);
    // let grid = [];//

    for (let i = start + 1; i <= end; i++) {
      grid = [
        ...grid,
        {
          index: getValue(grid, radius, i - start),
          radius,
          position: i - start
        }
      ];
    }

    return grid;
  };

  const getValue = (grid, radius, position) => {
    console.log('------------');
    console.log('grid', grid, radius, position);

    if (radius === 1) {
      return 1;
    }

    const normalised = position % (radius + 1);
    const previousRadius = radius - 2;
    const corner = radius;

    console.log('n', normalised, 'c', corner);
    if (normalised === 1) {
      console.log('first sq');
      const adjacentSquares = [
        ...grid.filter(
          item => item.radius === previousRadius && item.position === position
        ),
        ...grid.filter(
          item =>
            item.radius === previousRadius && item.position === position + 1
        )
      ];

      return adjacentSquares.reduce((acc, curr) => acc + curr.index, 0);
    }

    if (normalised === corner) {
      console.log('corner sq');

      const adjacentSquares = [
        ...grid.filter(item => {
          console.log('looking up', previousRadius, position);
          return item.radius === previousRadius && item.position === position;
        }),
        ...grid.filter(item => {
          console.log('looking up', previousRadius, position + 1);
          return (
            item.radius === previousRadius && item.position === position + 1
          );
        }),
        ...grid.filter(item => {
          console.log('looking up', radius, position - 1);
          return item.radius === radius && item.position === position - 1;
        })
      ];

      return adjacentSquares.reduce((acc, curr) => acc + curr.index, 0);
    }

    console.log('other sq', previousRadius, position);

    const adjacentSquares = [
      ...grid.filter(item => {
        console.log('looking up', previousRadius, position);
        return item.radius === previousRadius && item.position === position;
      }),
      ...grid.filter(item => {
        console.log('looking up', previousRadius, position + 1);
        return item.radius === previousRadius && item.position === position + 1;
      }),
      ...grid.filter(item => {
        console.log('looking up', previousRadius, position - 1);
        return item.radius === previousRadius && item.position === position - 1;
      }),
      ...grid.filter(item => {
        console.log('looking up', radius, position - 1);
        return item.radius === radius && item.position === position - 1;
      })
    ];

    return adjacentSquares.reduce((acc, curr) => acc + curr.index, 0);
  };

  let radius = 1;
  let grid = [];

  while (input > Math.pow(radius, 2)) {
    grid = createGrid(grid, radius);
    radius += 2;
  }

  console.log('grid', grid);
  return 0;
  // return grid.pop().index;
};

console.log('input1:', part1(input1));
console.log('input2:', part1(input2));
console.log('input3:', part1(input3));
console.log('input4:', part1(input4));
console.log('input5:', part1(input5));

console.log('input1:', part2(input1));
console.log('input2:', part2(input2));
// console.log('input3:', part2(input3));
// console.log('input4:', part2(input4));
// console.log('input5:', part2(input5));
