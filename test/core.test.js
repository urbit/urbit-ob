const ob = require('../src/index.js');


test('test patp2add lex', () => {
  expect(ob.patp2add('lex')).toEqual('200');
});

test('test patp2add samzod', () => {
  expect(ob.patp2add('samzod')).toEqual('1024');
});

test('test patp2add sambinzod', () => {
  expect(ob.patp2add('sambinzod')).toBe(undefined);
});

test('test patp2add poldec-tonteg', () => {
  expect(ob.patp2add('poldec-tonteg')).toBe(9896704);
});

test('convert ship num 200 to ~lex', () => {
  expect(ob.toGalaxyName(200)).toBe('lex');
});

test('convert ship num 512 to ~binzod', () => {
  expect(ob.toStarName(512)).toBe('binzod');
});

test('convert ship num 9896704 to ~poldec-tonteg', () => {
  expect(ob.toPlanetName(9896704)).toBe('poldec-tonteg');
});

test('generic explicit conversion: 0 to zod', () => {
  expect(ob._add2patp(0, 1, false)).toBe('zod');
});

test('generic explicit conversion: 512 to ~binzod', () => {
  expect(ob._add2patp(512, 2, false)).toBe('binzod');
});

test('generic explicit conversion: 9896704 to poldec-tonteg', () => {
  expect(ob._add2patp(9896704, 4, true)).toBe('poldec-tonteg');
});

test('generic simple conversion: 0 to zod', () => {
  expect(ob.add2patp(0)).toBe('zod');
});

test('generic simple conversion: 512 to binzod', () => {
  expect(ob.add2patp(512)).toBe('binzod');
});

test('generic simple conversion: 9896704 to poldec-tonteg', () => {
  expect(ob.add2patp(9896704)).toBe('poldec-tonteg');
});

test('identifies poldec-tonteg as a ship', () => {
  expect(ob.isValidName('poldec-tonteg')).toBe(true);
});

test('invalidates aaa as not a ship', () => {
  expect(ob.isValidName('aaa')).toBe(false);
});

test('invalidates aaaaaa as not a ship', () => {
  expect(ob.isValidName('aaaaaa')).toBe(false);
});

test('invalidates ////// as not a ship', () => {
  expect(ob.isValidName('//////')).toBe(false);
});

test('invalidates //////////// as not a ship', () => {
  expect(ob.isValidName('////////////')).toBe(false);
});

test('invalidates //////-////// as not a ship', () => {
  expect(ob.isValidName('//////-//////')).toBe(false);
});

test('identifies poldec-tonteg as a planet', () => {
  expect(ob.tierOfpatp('poldec-tonteg')).toBe('planet');
});

test('identifies poldec as a star', () => {
  expect(ob.tierOfpatp('poldec')).toBe('star');
});

test('identifies zod as a galaxy from @P', () => {
  expect(ob.tierOfpatp('zod')).toBe('galaxy');
});

test('identifies binzod as a star from @P', () => {
  expect(ob.tierOfpatp('binzod')).toBe('star');
});

test('identifies poldec-tonteg as a star from @P', () => {
  expect(ob.tierOfpatp('poldec-tonteg')).toBe('planet');
});

test('identifies zod as a galaxy from address', () => {
  expect(ob.tierOfadd(0)).toBe('galaxy');
});

test('identifies binzod as a star from address', () => {
  expect(ob.tierOfadd(512)).toBe('star');
});

test('identifies poldec-tonteg as a planet from address', () => {
  expect(ob.tierOfadd(9896704)).toBe('planet');
});
