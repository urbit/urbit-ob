const { expect } = require('chai');
const { isEqual } = require('lodash')

const ob = require('../src');

describe('utils', () => {
  it('feen', () => {
    expect(ob._feen(0x10100)).to.equal(0x63b30e1c);
  })

  it('fend', () => {
    expect(ob._fend(0x63b30e1c)).to.equal(0x10100);
  })

  it('muk', () => {
    expect(ob._muk(0, 2, 0x101)).to.equal(0x42081a9b);
    expect(ob._muk(0, 2, 0x201)).to.equal(0x64c7667e);
  })

  it('getAt', () => {
    expect(ob._getAt(['a', 'b', 'c'], 1)).to.equal('b');
  });

  it('len', () => {
    expect(ob._len(['a', 'b', 'c'])).to.equal(3);
  });

  it('lid', () => {
    expect(ob._lid(['a', 'b', 'c'])).to.equal(2);
  });

  it('indexOf', () => {
    expect(ob._indexOf(['a', 'b', 'c'], 'b')).to.equal(1);
  });

  it('isOdd', () => {
    expect(ob._isOdd(3)).to.equal(true);
    expect(ob._isOdd(0)).to.equal(false);
  })

  it('isEven', () => {
    expect(ob._isEven(3)).to.equal(false);
    expect(ob._isEven(0)).to.equal(true);
  });

  it('seq', () => {
    expect(isEqual(ob._seq(3), [0, 1, 2])).to.equal(true);
  });

})

