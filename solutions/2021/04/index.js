import { example, data } from './input'

export const inputParser = (input) => input.split('\n')

const parsedData = inputParser(data)

export const part1 = (input = parsedData) => {
  const drawnNumbers = input.shift().split(',').map(Number);
  const bingoBoardsMatrix = [];  // store number by boardIndex*25 + rowIndex*5 + columnIndex
  const bingoMarkedMatrix = [];  // store marking by boardIndex*25 + rowIndex*5 + columnIndex
  const numberLocations = [];
  // initialise numberLcoations with empty array
  for (let i = 0; i < 100; i++) {
    numberLocations[i] = [];
  }
  let boardIndex = 0;
  while (input.length > 0) {
    input.shift();
    for (let rowIndex = 0; rowIndex < 5; rowIndex++) {
      input.shift().trim().split(/[ ]+/).map(Number).forEach((num, coulumnIndex) => {
        bingoBoardsMatrix.push(num);
        bingoMarkedMatrix.push(false);
        numberLocations[num].push(boardIndex * 25 + rowIndex * 5 + coulumnIndex);
      });
    }
    boardIndex++;
  }

  const isBingo = (location) => {
    bingoMarkedMatrix[location] = true;
    const boardIndex = location - location % 25;
    const rowIndex = location - location % 5;

    // check row
    let bingo = true;
    for (let i = 0; i < 5; i++) {
      if (!bingoMarkedMatrix[rowIndex + i]) {
        bingo = false;
        break;
      }
    }
    if (bingo)
      return true;

    // check column
    bingo = true;
    for (let i = 0; i < 5; i++)
      if (!bingoMarkedMatrix[boardIndex + i * 5 + location % 5]) {
        bingo = false;
        break;
      }
    return bingo;
  };

  for (let i = 0; i < drawnNumbers.length; i++) {
    for (let j = 0; j < numberLocations[drawnNumbers[i]].length; j++) {
      if (isBingo(numberLocations[drawnNumbers[i]][j])) {
        const boardIndex = numberLocations[drawnNumbers[i]][j] - numberLocations[drawnNumbers[i]][j] % 25;
        let unmarkedSum = 0;
        for (let i = 0; i < 25; i++) {
          if (!bingoMarkedMatrix[boardIndex + i]) {
            unmarkedSum += bingoBoardsMatrix[boardIndex + i];
          }
        }
        return drawnNumbers[i] * unmarkedSum;
      }
    }
  }

  return 0;
}

export const part2 = (input = parsedData) => {
  const drawnNumbers = input.shift().split(',').map(Number);
  const bingoBoardsMatrix = [];  // store number by boardIndex*25 + rowIndex*5 + columnIndex
  const bingoMarkedMatrix = [];  // store marking by boardIndex*25 + rowIndex*5 + columnIndex
  const numberLocations = [];

  const yetToWinBoards = new Set(); // tracking boards left to win

  // initialise numberLcoations with empty array
  for (let i = 0; i < 100; i++) {
    numberLocations[i] = [];
  }
  let boardIndex = 0;
  while (input.length > 0) {
    input.shift();
    for (let rowIndex = 0; rowIndex < 5; rowIndex++) {
      input.shift().trim().split(/[ ]+/).map(Number).forEach((num, coulumnIndex) => {
        bingoBoardsMatrix.push(num);
        bingoMarkedMatrix.push(false);
        numberLocations[num].push(boardIndex * 25 + rowIndex * 5 + coulumnIndex);
      });
    }
    yetToWinBoards.add(boardIndex * 25);
    boardIndex++;
  }

  const isBingo = (location) => {
    const boardIndex = location - location % 25;
    const rowIndex = location - location % 5;

    // check row
    let bingo = true;
    for (let i = 0; i < 5; i++) {
      if (!bingoMarkedMatrix[rowIndex + i]) {
        bingo = false;
        break;
      }
    }

    if (bingo)
      return true;

    // check column
    bingo = true;
    for (let i = 0; i < 5; i++)
      if (!bingoMarkedMatrix[boardIndex + i * 5 + location % 5]) {
        bingo = false;
        break;
      }
    return bingo;
  };

  for (let i = 0; i < drawnNumbers.length; i++) {
    // marking each number
    for (let j = 0; j < numberLocations[drawnNumbers[i]].length; j++) {
      // marking on each board
      bingoMarkedMatrix[numberLocations[drawnNumbers[i]][j]] = true;
      const boardIndex = numberLocations[drawnNumbers[i]][j] - numberLocations[drawnNumbers[i]][j] % 25;
      if (yetToWinBoards.has(boardIndex))
        if (isBingo(numberLocations[drawnNumbers[i]][j])) {

          // check if this is the last winning board
          if (yetToWinBoards.size == 1) {
            let unmarkedSum = 0;
            for (let i = 0; i < 25; i++) {
              if (!bingoMarkedMatrix[boardIndex + i]) {
                unmarkedSum += bingoBoardsMatrix[boardIndex + i];
              }
            }
            return drawnNumbers[i] * unmarkedSum;
          }

          // remove this board as it has bingo
          yetToWinBoards.delete(boardIndex);
        }
    }
  }

  return 0;
}

export default {
  part1,
  part2,
}
