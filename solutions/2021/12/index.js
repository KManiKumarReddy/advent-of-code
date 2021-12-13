import { example, data } from './input'

export const inputParser = (input) => input.split('\n').map((line) => line.split('-'))

const parsedData = inputParser(data)


export const part1 = (input = parsedData) => {
  const pathsFromCave = {};

  input.forEach(([from, to]) => {
    if (from !== 'end' & to !== 'start') {
      if (!pathsFromCave[from])
        pathsFromCave[from] = new Set([to]);
      else
        pathsFromCave[from].add(to);
    }
    if (from !== 'start' & to !== 'end') {
      if (!pathsFromCave[to])
        pathsFromCave[to] = new Set([from]);
      else
        pathsFromCave[to].add(from);
    }
  });

  let count = 0;
  const countPaths = (cave, path) => {
    if (cave === 'end') {
      count++;
      return;
    }
    path.push(cave);
    if (pathsFromCave[cave]) {
      pathsFromCave[cave].forEach((cave) => {
        if (cave !== cave.toLowerCase() || path.indexOf(cave) === -1)
          countPaths(cave, [...path]);
      });
    }
  };
  countPaths('start', []);
  return count;
}

export const part2 = (input = parsedData) => {
  const pathsFromCave = {};

  input.forEach(([from, to]) => {
    if (from !== 'end' & to !== 'start') {
      if (!pathsFromCave[from])
        pathsFromCave[from] = new Set([to]);
      else
        pathsFromCave[from].add(to);
    }
    if (from !== 'start' & to !== 'end') {
      if (!pathsFromCave[to])
        pathsFromCave[to] = new Set([from]);
      else
        pathsFromCave[to].add(from);
    }
  });
  let count = 0;
  const countPaths = (cave, path, revisited) => {
    if (cave === 'end') {
      count++;
      return;
    }
    path.push(cave);
    if (pathsFromCave[cave]) {
      pathsFromCave[cave].forEach((cave) => {
        if (cave !== cave.toLowerCase())
          countPaths(cave, [...path], revisited);
        else if (path.indexOf(cave) === -1) {
          countPaths(cave, [...path], revisited);
        }
        else if (!revisited)
          countPaths(cave, [...path], true);
      });
    }
  };
  countPaths('start', [], false);
  return count;
}

export default {
  part1,
  part2,
}
