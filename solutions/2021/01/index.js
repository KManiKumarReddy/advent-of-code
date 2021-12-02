import { example, data } from './input'

export const inputParser = (input) => input.split('\n')

const parsedData = inputParser(data)

export const part1 = (input = parsedData) => {
  let count = 0;
  for (let i = 1; i < input.length; i++) {
    if (Number(input[i]) > Number(input[i - 1]))
      count += 1;
  }
  return count;
}

export const part2 = (input = parsedData) => {
  let count = 0, currentSum = Number(input[0]) + Number(input[1]) + Number(input[2]);
  for (let i = 3; i < input.length; i++) {
    if (currentSum + Number(input[i]) - Number(input[i-3]) > currentSum)
      count += 1;
    currentSum += Number(input[i]);
    currentSum -= Number(input[i-3]);
  }
  return count;
}

export default {
  part1,
  part2,
}
