import { example, data } from './input'

export const inputParser = (input) => input.split('\n')

const parsedData = inputParser(data)

export const part1 = (input = parsedData) => {
  const map = {};
  let intersections = 0;

  const markLocaionOnMap = (location) => {
    if (!map[location]) {
      map[location] = 1;
    }
    else {
      if (map[location] === 1) {
        intersections++;
      }
      map[location]++;
    }
  }

  input.forEach((lineSegment) => {
    const [[x1, y1], [x2, y2]] = lineSegment.split(' -> ').map((pointStr) => pointStr.split(',').map(Number));
    if (x1 == x2) {
      let start, end;
      if (y1 < y2) {
        start = y1;
        end = y2;
      }
      else {
        start = y2;
        end = y1;
      }
      for (; start <= end; start++) {
        const location = start * 1000 + x1;
        markLocaionOnMap(location);
      }
    }
    else if (y1 == y2) {
      let start, end;
      if (x1 < x2) {
        start = x1;
        end = x2;
      }
      else {
        start = x2;
        end = x1;
      }
      for (; start <= end; start++) {
        const location = y1 * 1000 + start;
        markLocaionOnMap(location);
      }
    }
  });
  return intersections;
}

export const part2 = (input = parsedData) => {
  const map = {};
  let intersections = 0;

  const markLocaionOnMap = (location) => {
    if (!map[location]) {
      map[location] = 1;
    }
    else {
      if (map[location] === 1) {
        intersections++;
      }
      map[location]++;
    }
  }

  input.forEach((lineSegment) => {
    const [[x1, y1], [x2, y2]] = lineSegment.split(' -> ').map((pointStr) => pointStr.split(',').map(Number));
    if (x1 == x2) {
      let start, end;
      if (y1 < y2) {
        start = y1;
        end = y2;
      }
      else {
        start = y2;
        end = y1;
      }
      for (; start <= end; start++) {
        const location = start * 1000 + x1;
        markLocaionOnMap(location);
      }
    }
    else if (y1 == y2) {
      let start, end;
      if (x1 < x2) {
        start = x1;
        end = x2;
      }
      else {
        start = x2;
        end = x1;
      }
      for (; start <= end; start++) {
        const location = y1 * 1000 + start;
        markLocaionOnMap(location);
      }
    }
    else if ((x2 - x1) / (y2 - y1) === 1) {
      let startx, endx, starty;
      if (x1 < x2) {
        startx = x1;
        endx = x2;
      }
      else {
        startx = x2;
        endx = x1;
      }
      if (y1 < y2) {
        starty = y1;
      }
      else {
        starty = y2;
      }
      for (; startx <= endx; startx++, starty++) {
        const location = starty * 1000 + startx;
        markLocaionOnMap(location);
      }
    }
    else {
      let startx, endx, starty;
      if (x1 < x2) {
        startx = x2;
        endx = x1;
      }
      else {
        startx = x1;
        endx = x2;
      }
      if (y1 < y2) {
        starty = y1;
      }
      else {
        starty = y2;
      }
      for (; startx >= endx; startx--, starty++) {
        const location = starty * 1000 + startx;
        markLocaionOnMap(location);
      }
    }

    // let str = '';
    // for (let i = 0; i < 10; i++) {
    //   for (let j = 0; j < 10; j++)
    //     str += map[i * 10 + j] ? map[i * 10 + j] : '.';
    //   str += '\n';
    // }
    // console.log(lineSegment);
    // console.log(str);
  });
  return intersections;
}

export default {
  part1,
  part2,
}
