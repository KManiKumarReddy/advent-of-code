import { example, data } from './input'


const printPaperPlot = (plot) => {
  let s = '';
  for (let i = 0; i < plot.length; i++) {
    s += `${i.toLocaleString('en-IN', { minimumIntegerDigits: 2 })}: `;
    for (let j = 0; j < plot[0].length; j++)
      s += plot[i][j] ? '#' : '.';
    s += '\n';
  }
  console.log(s);
}

export const inputParser = (input) => {
  const [points, commands] = input.split('\n\n').map(para => para.split('\n'));

  let maxX = -1, maxY = -1;
  points.forEach(point => {
    const [x, y] = point.split(',').map(Number);
    if (x > maxX)
      maxX = x;
    if (y > maxY)
      maxY = y;
  });
  const paperPlot = new Array(maxY + 1);
  for (let i = 0; i <= maxY; i++)
    paperPlot[i] = new Array(maxX + 1);

  points.forEach(point => {
    const [x, y] = point.split(',').map(Number);
    paperPlot[y][x] = true;
  });

  const folds = commands.map(command => new Object({ onAxis: command.charAt(11), at: Number(command.substring(13)) }));
  return { paperPlot, folds };
}

const parsedData = inputParser(data)

export const part1 = (input = parsedData) => {
  const { paperPlot, folds } = input;
  const { onAxis, at } = folds[0];

  if (onAxis === 'x') {
    const foldedHalf = [];
    paperPlot.forEach(row => {
      const halfRow = row.splice(at);
      halfRow.shift();
      foldedHalf.push(halfRow);
    });
    foldedHalf.forEach((row, y) => row.forEach((dot, x) => {
      if (dot) {
        paperPlot[y][at - x - 1] = true;
      }
    }));
  }
  else {
    const foldedHalf = paperPlot.splice(at);
    foldedHalf.shift();

    foldedHalf.forEach((row, y) => row.forEach((dot, x) => {
      if (dot) {
        paperPlot[at - y - 1][x] = true;
      }
    }));
  }
  // printPaperPlot(paperPlot);
  let count = 0;
  paperPlot.forEach((row) => row.forEach((_dot) => {
    ++count;
  }));
  return count;
  // return paperPlot.reduce((rowCount, row) => {
  //   console.log(row, rowCount);
  //   return rowCount + row.reduce((count, dot) => {
  //     console.log(dot, count);
  //     return count + dot ? 1 : 0;
  //   }, 0)
  // }, 0);
}

export const part2 = (input = parsedData) => {
  const { paperPlot, folds } = input;
  folds.forEach((fold) => {
    const { onAxis, at } = fold;

    if (onAxis === 'x') {
      const foldedHalf = [];
      paperPlot.forEach(row => {
        const halfRow = row.splice(at);
        halfRow.shift();
        foldedHalf.push(halfRow);
      });
      foldedHalf.forEach((row, y) => row.forEach((dot, x) => {
        if (dot) {
          paperPlot[y][at - x - 1] = true;
        }
      }));
    }
    else {
      const foldedHalf = paperPlot.splice(at);
      foldedHalf.shift();

      foldedHalf.forEach((row, y) => row.forEach((dot, x) => {
        if (dot) {
          paperPlot[at - y - 1][x] = true;
        }
      }));
    }
  });
  printPaperPlot(paperPlot);
  let count = 0;
  paperPlot.forEach((row) => row.forEach((_dot) => {
    ++count;
  }));
  return count;
}

export default {
  part1,
  part2,
}
