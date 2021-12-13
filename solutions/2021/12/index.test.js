const { inputParser, part1, part2 } = require('./index.js')
const { example, data, basicExample, shortExample } = require('./input.js')

test('part 1 basic example', () => {
  expect(part1(inputParser(basicExample))).toBe(10)
})

test('part 1 short example', () => {
  expect(part1(inputParser(shortExample))).toBe(19)
})

test('part 1 example', () => {
  expect(part1(inputParser(example))).toBe(226)
})

test('part 1 data', () => {
  expect(part1(inputParser(data))).toBe(3761)
})

test('part 2 basic example', () => {
  expect(part2(inputParser(basicExample))).toBe(36)
})

test('part 2 short example', () => {
  expect(part2(inputParser(shortExample))).toBe(103)
})

test('part 2 example', () => {
  expect(part2(inputParser(example))).toBe(3509)
})

test('part 2 data', () => {
  expect(part2(inputParser(data))).toBe(99138)
})
