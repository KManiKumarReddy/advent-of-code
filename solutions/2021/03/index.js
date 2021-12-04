import { example, data } from './input'

export const inputParser = (input) => input.split('\n')

const parsedData = inputParser(data)

export const part1 = (input = parsedData) => {
  const binaryLength = input[0].length;
  let count1s = [], count0s = [];

  for (let i = 0; i < binaryLength; i++) {
    count1s.push(0); count0s.push(0);
  }
  input.forEach((binaryString) => {
    for (let i = 0; i < binaryLength; i++) {
      if (binaryString.charAt(i) === '1')
        count1s[i]++;
      else
        count0s[i]++;
    }
  });
  let gammaString = '', epsilonString = '';

  for (let i = 0; i < binaryLength; i++) {
    if (count1s[i] > count0s[i]) {
      gammaString += '1';
      epsilonString += '0';
    }
    else {
      gammaString += '0';
      epsilonString += '1';
    }
  }
  return parseInt(epsilonString, 2) * parseInt(gammaString, 2);
}

export const part2 = (input = parsedData) => {
  const binaryLength = input[0].length;
  let stringswith1s = [], stringswith0s = [], charIndex = 0;

  input.forEach((binaryString) => {
    if (binaryString.charAt(charIndex) === '1')
      stringswith1s.push(binaryString);
    else
      stringswith0s.push(binaryString);
  });

  let o2strings = stringswith0s.length > stringswith1s.length ? stringswith0s : stringswith1s
    , co2strings = stringswith1s.length < stringswith0s.length ? stringswith1s : stringswith0s;

  charIndex = 1;
  while (co2strings.length > 1) {
    stringswith1s = [], stringswith0s = [];
    co2strings.forEach((binaryString) => {
      if (binaryString.charAt(charIndex) === '1')
        stringswith1s.push(binaryString);
      else
        stringswith0s.push(binaryString);
    });
    charIndex++;
    co2strings = stringswith1s.length < stringswith0s.length ? stringswith1s : stringswith0s;
  }


  charIndex = 1;
  while (o2strings.length > 1) {
    stringswith1s = [], stringswith0s = [];
    o2strings.forEach((binaryString) => {
      if (binaryString.charAt(charIndex) === '1')
        stringswith1s.push(binaryString);
      else
        stringswith0s.push(binaryString);
    });
    charIndex++;
    o2strings = stringswith0s.length > stringswith1s.length ? stringswith0s : stringswith1s;
  }
  return parseInt(co2strings[0], 2) * parseInt(o2strings[0], 2);
}

export default {
  part1,
  part2,
}
