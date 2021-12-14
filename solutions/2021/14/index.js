import { example, data } from './input'

export const inputParser = (input) => {
  const lines = input.split('\n');
  const template = lines.shift();
  lines.shift();
  const pairInsertionRules = {};
  lines.forEach((l) => {
    const [pair, replacement] = l.split(' -> ');
    pairInsertionRules[pair] = replacement
  });
  return {
    template,
    pairInsertionRules
  }
}

const parsedData = inputParser(data)

export const part1 = (input = parsedData) => {
  const { template, pairInsertionRules } = input;
  let currentPolymer = template, stepsCompleted = 0, charCounts = {};
  template.split('').forEach((c) => {
    if (charCounts[c])
      ++charCounts[c];
    else
      charCounts[c] = 1;
  });
  while (stepsCompleted < 10) {
    let i = 0, newPolymer = '';
    while (i < currentPolymer.length - 1) {
      const insertingChar = pairInsertionRules[currentPolymer.substr(i, 2)];
      // console.log(insertingChar);
      if (charCounts[insertingChar])
        ++charCounts[insertingChar];
      else
        charCounts[insertingChar] = 1;
      newPolymer += currentPolymer.charAt(i) + insertingChar;

      // console.log(`pair: ${currentPolymer.substr(i, 2)}, inserting ${insertingChar}, new ${newPolymer}`);
      i++;
    }
    newPolymer += currentPolymer.charAt(i);
    currentPolymer = newPolymer;
    ++stepsCompleted;
    // console.log(`After step ${stepsCompleted}: ${currentPolymer}`);
  }
  // console.log(charCounts);
  const counts = Object.values(charCounts).sort((a, b) => a - b);
  // console.log(counts);
  return counts[counts.length - 1] - counts[0];
}

export const part2 = (input = parsedData) => {
  const { template, pairInsertionRules } = input;
  let currentPairs = {}, stepsCompleted = 0, charCounts = {}, currentPair = [template.charAt(0)];
  template.split('').forEach((c, i) => {
    if (charCounts[c])
      ++charCounts[c];
    else
      charCounts[c] = 1;
    if (i !== 0) {
      currentPair.push(c);
      if (currentPair.length > 2) {
        currentPair.shift();
      }
      if (currentPairs[currentPair.join('')])
        ++currentPairs[currentPair.join('')];
      else
        currentPairs[currentPair.join('')] = 1;
    }
  });
  // console.log(currentPairs);
  while (stepsCompleted < 40) {
    let i = 0, newPairs = {};
    Object.keys(currentPairs).forEach((pair) => {
      const insertingChar = pairInsertionRules[pair];
      if (charCounts[insertingChar])
        charCounts[insertingChar] += currentPairs[pair];
      else
        charCounts[insertingChar] = currentPairs[pair];
      const builtPairs = [pair.charAt(0) + insertingChar, insertingChar + pair.charAt(1)];
      builtPairs.forEach((newPair) => {
        if (newPairs[newPair])
          newPairs[newPair] += currentPairs[pair];
        else
          newPairs[newPair] = currentPairs[pair]
      })
    });
    currentPairs = newPairs;
    ++stepsCompleted;
    // console.log(`After step ${stepsCompleted}: `, currentPairs);
  }
  // console.log(charCounts);
  const counts = Object.values(charCounts).sort((a, b) => a - b);
  return counts[counts.length - 1] - counts[0];
}

export default {
  part1,
  part2,
}
