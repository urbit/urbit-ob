const BN = require('bn.js')
const { expect } = require('chai');
const isEqual = require('lodash.isequal')
const { muk } = require('../src/internal/muk')

describe('muk', () => {
  it('matches expected reference values', () => {
    let input = new BN(0x101)
    let output = new BN(0x42081a9b)
    expect(muk(0, 2, input).eq(output)).to.equal(true)

    input = new BN(0x201)
    output = new BN(0x64c7667e)
    expect(muk(0, 2, input).eq(output)).to.equal(true)

    input = new BN(0x4812)
    output = new BN(0xa30782dc)
    expect(muk(0, 2, input).eq(output)).to.equal(true)
  })
})
