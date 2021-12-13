const { inputParser, part1, part2 } = require('./index.js')
const { example, data, shortExample } = require('./input.js')

test('part 1 example', () => {
  expect(part1(inputParser(example))).toBe(26)
})

test('part 1 data', () => {
  expect(part1(inputParser(data))).toBe(355)
})

test('part 2 short example', () => {
  expect(part2(inputParser(shortExample))).toBe(8394)
})

test('part 2 example', () => {
  expect(part2(inputParser(example))).toBe(61229)
})

test('part 2 data', () => {
  expect(part2(inputParser(data))).toBe(983030)
})
