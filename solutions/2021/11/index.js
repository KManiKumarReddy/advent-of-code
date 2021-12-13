import { example, data } from './input'

export const inputParser = (input) => input.split('\n')

const parsedData = inputParser(data)

export const part1 = (input = parsedData) => {
  const grid = input.map(line => line.split('').map(Number));

  const flash = (rowIndex, colIndex) => {
    if (grid[rowIndex] && grid[rowIndex][colIndex]) {

      grid[rowIndex][colIndex] = 0;

      if (grid[rowIndex - 1]) {
        if (grid[rowIndex - 1][colIndex - 1]) {
          ++grid[rowIndex - 1][colIndex - 1];
          if (grid[rowIndex - 1][colIndex - 1] > 9)
            flash(rowIndex - 1, colIndex - 1);
        }
        if (grid[rowIndex - 1][colIndex + 1]) {
          ++grid[rowIndex - 1][colIndex + 1];
          if (grid[rowIndex - 1][colIndex + 1] > 9)
            flash(rowIndex - 1, colIndex + 1);
        }
        if (grid[rowIndex - 1][colIndex]) {
          ++grid[rowIndex - 1][colIndex];
          if (grid[rowIndex - 1][colIndex] > 9)
            flash(rowIndex - 1, colIndex);
        }
      }
      if (grid[rowIndex + 1]) {
        if (grid[rowIndex + 1][colIndex - 1]) {
          ++grid[rowIndex + 1][colIndex - 1];
          if (grid[rowIndex + 1][colIndex - 1] > 9)
            flash(rowIndex + 1, colIndex - 1);
        }
        if (grid[rowIndex + 1][colIndex + 1]) {
          ++grid[rowIndex + 1][colIndex + 1];
          if (grid[rowIndex + 1][colIndex + 1] > 9)
            flash(rowIndex + 1, colIndex + 1);
        }
        if (grid[rowIndex + 1][colIndex]) {
          ++grid[rowIndex + 1][colIndex];
          if (grid[rowIndex + 1][colIndex] > 9)
            flash(rowIndex + 1, colIndex);
        }
      }
      if (grid[rowIndex][colIndex - 1]) {
        ++grid[rowIndex][colIndex - 1];
        if (grid[rowIndex][colIndex - 1] > 9)
          flash(rowIndex, colIndex - 1);
      }
      if (grid[rowIndex][colIndex + 1]) {
        ++grid[rowIndex][colIndex + 1];
        if (grid[rowIndex][colIndex + 1] > 9)
          flash(rowIndex, colIndex + 1);
      }
    }

  }

  let totalFlashes = 0, stepsCompleted = 0;
  while (stepsCompleted < 100) {
    let flashes = 0;

    for (let rowIndex = 0; rowIndex < 10; rowIndex++)
      for (let colIndex = 0; colIndex < 10; colIndex++)
        ++grid[rowIndex][colIndex];

    for (let rowIndex = 0; rowIndex < 10; rowIndex++)
      for (let colIndex = 0; colIndex < 10; colIndex++)
        if (grid[rowIndex][colIndex] > 9)
          flash(rowIndex, colIndex);

    for (let rowIndex = 0; rowIndex < 10; rowIndex++)
      for (let colIndex = 0; colIndex < 10; colIndex++)
        if (grid[rowIndex][colIndex] == 0) {
          ++flashes;
        }


    totalFlashes += flashes;
    ++stepsCompleted;
    // console.log(`After Step ${stepsCompleted}:\n${grid.map((rows) => rows.join('')).join('\n')}`);
  }
  return totalFlashes;
}

export const part2 = (input = parsedData) => {
  const grid = input.map(line => line.split('').map(Number));

  const flash = (rowIndex, colIndex) => {
    if (grid[rowIndex] && grid[rowIndex][colIndex]) {

      grid[rowIndex][colIndex] = 0;

      if (grid[rowIndex - 1]) {
        if (grid[rowIndex - 1][colIndex - 1]) {
          ++grid[rowIndex - 1][colIndex - 1];
          if (grid[rowIndex - 1][colIndex - 1] > 9)
            flash(rowIndex - 1, colIndex - 1);
        }
        if (grid[rowIndex - 1][colIndex + 1]) {
          ++grid[rowIndex - 1][colIndex + 1];
          if (grid[rowIndex - 1][colIndex + 1] > 9)
            flash(rowIndex - 1, colIndex + 1);
        }
        if (grid[rowIndex - 1][colIndex]) {
          ++grid[rowIndex - 1][colIndex];
          if (grid[rowIndex - 1][colIndex] > 9)
            flash(rowIndex - 1, colIndex);
        }
      }
      if (grid[rowIndex + 1]) {
        if (grid[rowIndex + 1][colIndex - 1]) {
          ++grid[rowIndex + 1][colIndex - 1];
          if (grid[rowIndex + 1][colIndex - 1] > 9)
            flash(rowIndex + 1, colIndex - 1);
        }
        if (grid[rowIndex + 1][colIndex + 1]) {
          ++grid[rowIndex + 1][colIndex + 1];
          if (grid[rowIndex + 1][colIndex + 1] > 9)
            flash(rowIndex + 1, colIndex + 1);
        }
        if (grid[rowIndex + 1][colIndex]) {
          ++grid[rowIndex + 1][colIndex];
          if (grid[rowIndex + 1][colIndex] > 9)
            flash(rowIndex + 1, colIndex);
        }
      }
      if (grid[rowIndex][colIndex - 1]) {
        ++grid[rowIndex][colIndex - 1];
        if (grid[rowIndex][colIndex - 1] > 9)
          flash(rowIndex, colIndex - 1);
      }
      if (grid[rowIndex][colIndex + 1]) {
        ++grid[rowIndex][colIndex + 1];
        if (grid[rowIndex][colIndex + 1] > 9)
          flash(rowIndex, colIndex + 1);
      }
    }

  }

  let stepsCompleted = 0;
  while (true) {
    let flashes = 0;

    for (let rowIndex = 0; rowIndex < 10; rowIndex++)
      for (let colIndex = 0; colIndex < 10; colIndex++)
        ++grid[rowIndex][colIndex];

    for (let rowIndex = 0; rowIndex < 10; rowIndex++)
      for (let colIndex = 0; colIndex < 10; colIndex++)
        if (grid[rowIndex][colIndex] > 9)
          flash(rowIndex, colIndex);

    for (let rowIndex = 0; rowIndex < 10; rowIndex++)
      for (let colIndex = 0; colIndex < 10; colIndex++)
        if (grid[rowIndex][colIndex] == 0) {
          ++flashes;
        }


    ++stepsCompleted;
    if (flashes === 100) {
      return stepsCompleted;
    }
    // console.log(`After Step ${stepsCompleted}:\n${grid.map((rows) => rows.join('')).join('\n')}`);
  }

}

export default {
  part1,
  part2,
}
