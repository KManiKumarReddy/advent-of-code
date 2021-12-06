import { example, data } from './input'

export const inputParser = (input) => input.split('\n')

const parsedData = inputParser(data)

export const part1 = (input = parsedData) => {
  const state = input[0].split(',').map(Number);
  for (let i = 0; i < 80; i++) {
    let newFish = 0;
    state.forEach((internalTimer, position, arr) => {
      if (internalTimer === 0) {
        arr[position] = 6;
        newFish++;
      }
      else {
        arr[position]--;
      }
    });
    while (newFish--) {
      state.push(8);
    }
  }
  return state.length;
}

export const part2 = (input = parsedData) => {
  const fishInEachTimer = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  input[0].split(',').map(Number).forEach((timer) => fishInEachTimer[timer]++);
  for (let i = 0; i < 256; i++) {
    const fishSpawn = fishInEachTimer.shift();
    fishInEachTimer[6] += fishSpawn;
    fishInEachTimer.push(fishSpawn);
  }
  return fishInEachTimer.reduce((sum, fishCount) => sum += fishCount);
}

export default {
  part1,
  part2,
}
