const ob = require('../src/index.js');

test('test feen', () => {
  expect(ob._feen(0x10100)).toEqual(0x63b30e1c);
});

test('test fend', () => {
  expect(ob._fend(0x63b30e1c)).toEqual(0x10100);
});

test('test muk 1', () => {
  expect(ob._muk(0, 2, 0x101)).toEqual(0x42081a9b);
});

test('test muk 2', () => {
  expect(ob._muk(0, 2, 0x201)).toEqual(0x64c7667e);
});

test('getAt', () => {
  expect(ob._getAt(['a', 'b', 'c'], 1)).toEqual('b');
});

test('len', () => {
  expect(ob._len(['a', 'b', 'c'])).toEqual(3);
});

test('lid', () => {
  expect(ob._lid(['a', 'b', 'c'])).toEqual(2);
});

test('indexOf', () => {
  expect(ob._indexOf(['a', 'b', 'c'], 'b')).toEqual(1);
});

test('isOdd 3', () => {
  expect(ob._isOdd(3)).toEqual(true);
});

test('isOdd 0', () => {
  expect(ob._isOdd(0)).toEqual(false);
});

test('isEven 3', () => {
  expect(ob._isEven(3)).toEqual(false);
});

test('isEven 0', () => {
  expect(ob._isEven(0)).toEqual(true);
});

test('seq', () => {
  expect(ob._seq(3)).toEqual([0, 1, 2]);
});
