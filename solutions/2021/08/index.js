import { example, data } from './input'

export const inputParser = (input) => input.split('\n')

const parsedData = inputParser(data)

export const part1 = (input = parsedData) => {
  let count = 0;
  input.forEach((line) => {
    const outputDigitStrings = line.split('|')[1].trim().split(' ');
    count += outputDigitStrings.filter((s) => s.length == 2 || s.length == 3 || s.length == 4 || s.length == 7).length;
  });
  return count;
}

export const part2 = (input = parsedData) => {
  let sum = 0;
  input.forEach((line) => {
    const [inputDigitStrings, outputDigitStrings] = line.split('|').map(s => s.trim().split(' '));
    let topL, bottomL;
    const wiresActivatedForEachDigit = {};
    while (inputDigitStrings.length > 0) {
      const s = inputDigitStrings.shift();
      if (s.length == 4) {
        wiresActivatedForEachDigit[4] = new Set(s);
      }
      else if (s.length == 2) {
        wiresActivatedForEachDigit[1] = new Set(s);
      }
      else if (s.length == 3) {
        wiresActivatedForEachDigit[7] = new Set(s);
      }
      else if (s.length == 7) {
        wiresActivatedForEachDigit[8] = new Set(s);
      }
      else {
        if (wiresActivatedForEachDigit[1] && wiresActivatedForEachDigit[4] && wiresActivatedForEachDigit[7] && wiresActivatedForEachDigit[8]) {
          if (!topL) {
            topL = [...wiresActivatedForEachDigit[4]].filter((w) => !wiresActivatedForEachDigit[1].has(w));
            bottomL = [...wiresActivatedForEachDigit[8]].filter((w) => !(wiresActivatedForEachDigit[4].has(w) || wiresActivatedForEachDigit[7].has(w)));

          }
          if (s.length == 5) {
            const wires = new Set(s);
            // checking for 5
            if (wires.has(topL[0]) && wires.has(topL[1])) {
              wiresActivatedForEachDigit[5] = wires;
            }
            // checking for 2
            else if (wires.has(bottomL[0]) && wires.has(bottomL[1])) {
              wiresActivatedForEachDigit[2] = wires;
            }
            // checking for 3
            else {
              wiresActivatedForEachDigit[3] = wires;
            }
          }
          if (s.length == 6) {
            const wires = new Set(s);
            // checking if (6 or 9) or 0
            if (wires.has(topL[0]) && wires.has(topL[1])) {
              // checking if 6 or 9
              if (wires.has(bottomL[0]) && wires.has(bottomL[1])) {
                wiresActivatedForEachDigit[6] = wires;
              }
              else {
                wiresActivatedForEachDigit[9] = wires;
              }
            }
            else {
              wiresActivatedForEachDigit[0] = wires;
            }
          }
        }
        else {
          inputDigitStrings.push(s);
        }
      }
    }
    const displayNumber = outputDigitStrings.reduce((numberValue, digitString) => {
      if (digitString.length == 2) {
        return numberValue * 10 + 1;
      }
      else if (digitString.length == 4) {
        return numberValue * 10 + 4;
      }
      else if (digitString.length == 7) {
        return numberValue * 10 + 8;
      }
      else if (digitString.length == 3) {
        return numberValue * 10 + 7;
      }
      else if (digitString.length == 5) {
        const sets = [new Set(wiresActivatedForEachDigit[5]), new Set(wiresActivatedForEachDigit[3]), new Set(wiresActivatedForEachDigit[2])];
        digitString.split('').forEach((w) => sets.forEach((_set, i) => sets[i].delete(w)));
        return sets[0].size === 0 ? numberValue * 10 + 5 : (sets[1].size === 0 ? numberValue * 10 + 3 : numberValue * 10 + 2);
      }
      else {
        const sets = [new Set(wiresActivatedForEachDigit[6]), new Set(wiresActivatedForEachDigit[9]), new Set(wiresActivatedForEachDigit[0])];
        digitString.split('').forEach((w) => sets.forEach((_set, i) => sets[i].delete(w)));
        return sets[0].size === 0 ? numberValue * 10 + 6 : (sets[1].size === 0 ? numberValue * 10 + 9 : numberValue * 10);
      }
    }, 0);

    sum += displayNumber;
  });
  return sum;
}

export default {
  part1,
  part2,
}
