import { example, data } from './input'
import MaxHeap from '../../../utils/MaxHeap';

export const inputParser = (input) => input.split('\n')

const parsedData = inputParser(data)

export const part1 = (input = parsedData) => {
  const charMap = {
    ')': {
      inverted: '(',
      illegalScore: 3
    },
    ']': {
      inverted: '[',
      illegalScore: 57
    },
    '}': {
      inverted: '{',
      illegalScore: 1197
    },
    '>': {
      inverted: '<',
      illegalScore: 25137
    },
  }
  let score = 0;
  input.forEach((line) => {
    const stack = [];
    for (const c of line.trim()) {
      if (c === '{' || c === '(' || c === '[' || c === '<') {
        stack.push(c);
      }
      else if (stack.length === 0 || stack.pop() !== charMap[c].inverted) {
        score += charMap[c].illegalScore;
        break;
      }
    }
  });
  return score;
}

export const part2 = (input = parsedData) => {

  const charMap = {
    ')': {
      inverted: '(',
      illegalScore: 3
    },
    ']': {
      inverted: '[',
      illegalScore: 57
    },
    '}': {
      inverted: '{',
      illegalScore: 1197
    },
    '>': {
      inverted: '<',
      illegalScore: 25137
    },
  }
  const scoreMap = {
    '(': 1,
    '[': 2,
    '{': 3,
    '<': 4,
  }
  const scores = new MaxHeap();
  input.forEach((line) => {
    const stack = [];
    let isCorrupt = false;
    for (const c of line.trim()) {
      if (c === '{' || c === '(' || c === '[' || c === '<') {
        stack.push(c);
      }
      else if (stack.length === 0 || stack.pop() !== charMap[c].inverted) {
        isCorrupt = true;
        break;
      }
    }
    if (!isCorrupt) {
      let autoCompleteScore = 0;
      while (stack.length > 0) {
        autoCompleteScore = autoCompleteScore * 5 + scoreMap[stack.pop()];
      }
      scores.add(autoCompleteScore);
    }
  });
  let n = parseInt(scores.values.length / 2);
  while (n--) {
    scores.extractMax();
  }
  return scores.extractMax();

}

export default {
  part1,
  part2,
}
