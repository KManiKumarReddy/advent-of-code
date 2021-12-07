import { example, data } from './input'

export const inputParser = (input) => input.split('\n')

const parsedData = inputParser(data)



export const part1 = (input = parsedData) => {
  const crabPositions = input[0].split(',').map(Number);
  let cost = 0;

  crabPositions.sort();

  let K = crabPositions[parseInt(crabPositions.length / 2)];
  let i;
  for (i = 0; i < crabPositions.length; ++i) {
    cost += Math.abs(crabPositions[i] - K);
  }

  let optimalPosition = K;
  while (optimalPosition--) {
    let tempCost = 0;

    // Find cost again
    for (i = 0; i < crabPositions.length; ++i)
      tempCost += Math.abs(crabPositions[i] - optimalPosition);

    if (tempCost >= cost) {
      break;
    }
    cost = tempCost;
  }

  return cost;
}

export const part2 = (input = parsedData) => {
  const crabPositions = input[0].split(',').map(Number);
  let cost = 0;

  crabPositions.sort();

  let K = crabPositions[parseInt(crabPositions.length / 2)];
  let i;
  for (i = 0; i < crabPositions.length; ++i) {
    const steps = Math.abs(crabPositions[i] - K);
    cost += steps * (steps + 1) / 2;
  }

  let optimalPosition = K;
  while (optimalPosition--) {
    let tempCost = 0;

    // Find cost again
    for (i = 0; i < crabPositions.length; ++i) {
      const steps = Math.abs(crabPositions[i] - optimalPosition);
      tempCost += steps * (steps + 1) / 2;
    }

    if (tempCost >= cost) {
      break;
    }
    cost = tempCost;
  }
  optimalPosition = K;
  while (optimalPosition++) {
    let tempCost = 0;

    // Find cost again
    for (i = 0; i < crabPositions.length; ++i) {
      const steps = Math.abs(crabPositions[i] - optimalPosition);
      tempCost += steps * (steps + 1) / 2;
    }

    if (tempCost >= cost) {
      break;
    }
    cost = tempCost;
  }

  return cost;
}

export default {
  part1,
  part2,
}
