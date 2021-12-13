import { example, data } from './input'
import MaxHeap from '../../../utils/MaxHeap';

export const inputParser = (input) => input.split('\n')

const parsedData = inputParser(data)

export const part1 = (input = parsedData) => {
  const heightMap = input.map(a => a.split('').map(Number));
  let risk = 0;
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      if ((heightMap[i][j - 1] === undefined || heightMap[i][j] < heightMap[i][j - 1]) &&
        (heightMap[i - 1] === undefined || heightMap[i][j] < heightMap[i - 1][j]) &&
        (heightMap[i + 1] === undefined || heightMap[i][j] < heightMap[i + 1][j]) &&
        (heightMap[i][j + 1] === undefined || heightMap[i][j] < heightMap[i][j + 1])) {
        risk += 1 + heightMap[i][j];
      }
    }
  }
  return risk;
}

export const part2 = (input = parsedData) => {
  const heightMap = input.map(a => a.split('').map(Number));
  let basinHeights = new MaxHeap();

  const countBasinSize = (i, j) => {
    if (heightMap[i] === undefined || heightMap[i][j] === undefined || heightMap[i][j] === 9) {
      return 0;
    }
    heightMap[i][j] = 9;
    return 1
      + countBasinSize(i - 1, j)
      + countBasinSize(i, j - 1)
      + countBasinSize(i + 1, j)
      + countBasinSize(i, j + 1)
    // + countBasinSize(i + 1, j + 1)
    // + countBasinSize(i + 1, j - 1)
    // + countBasinSize(i - 1, j + 1)
    // + countBasinSize(i - 1, j - 1);
  };

  countBasinSize(0, 1);
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[0].length; j++) {
      if ((heightMap[i][j - 1] === undefined || heightMap[i][j] < heightMap[i][j - 1]) &&
        (heightMap[i - 1] === undefined || heightMap[i][j] < heightMap[i - 1][j]) &&
        (heightMap[i + 1] === undefined || heightMap[i][j] < heightMap[i + 1][j]) &&
        (heightMap[i][j + 1] === undefined || heightMap[i][j] < heightMap[i][j + 1])) {
        basinHeights.add(countBasinSize(i, j));
      }
    }
  }
  return basinHeights.extractMax() * basinHeights.extractMax() * basinHeights.extractMax();
}

export default {
  part1,
  part2,
}
