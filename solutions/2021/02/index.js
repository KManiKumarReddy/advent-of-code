import { example, data } from './input'

export const inputParser = (input) => input.split('\n')

const parsedData = inputParser(data)

export const part1 = (input = parsedData) => {
  let depth = 0, horizontal = 0; 
  input.forEach(command => {
    let [direction, distance] = command.split(' ');
    distance = Number(distance);
    switch(direction){
      case 'forward':
        horizontal += distance;
        break;
      case 'down':
        depth += distance;
        break;
      case 'up':
        depth -= distance;
        break;
    }
  })
  return depth*horizontal;
}

export const  part2 = (input = parsedData) => {
  let depth = 0, horizontal = 0, aim = 0; 
  input.forEach(command => {
    let [direction, distance] = command.split(' ');
    distance = Number(distance);
    switch(direction){
      case 'forward':
        horizontal += distance;
        depth += aim * distance;
        break;
      case 'down':
        aim += distance;
        break;
      case 'up':
        aim -= distance;
        break;
    }
  })
  return depth*horizontal;
}

export default {
  part1,
  part2,
}
