const BN = require('bn.js')
const { expect } = require('chai');
const jsc = require('jsverify')
const { isEqual } = require('lodash')
const {
  feen,
  fend,
  fice,
  teil,
  rynd,
  rund
  } = require('../src/internal/ob')

const bignums = jsc.uint32.smap(
  (num) => new BN(num),
  (bn) => bn.toNumber()
)

describe('feen/fend', () => {
  it('feen and fend are inverses', () => {
    let prop = jsc.forall(bignums, bn =>
      fend(feen(bn)).eq(bn) && feen(fend(bn)).eq(bn))

    jsc.assert(prop)
  })

  it('feen matches expected reference values', () => {
    let input = new BN('123456789')
    let output = new BN('1897766331')
    expect(feen(input).eq(output)).to.equal(true)

    input = new BN('15663360')
    output = new BN('1208402137')
    expect(feen(input).eq(output)).to.equal(true)
  })

  it('fend matches expected reference values', () => {
    let input = new BN('1897766331')
    let output = new BN('123456789')
    expect(fend(input).eq(output)).to.equal(true)

    input = new BN('1208402137')
    output = new BN('15663360')
    expect(fend(input).eq(output)).to.equal(true)
  })
})

describe('fice/teil', () => {
  it('fice and teil are inverses', () => {
    let prop = jsc.forall(bignums, bn =>
      fice(teil(bn)).eq(bn) && teil(fice(bn)).eq(bn))

    jsc.assert(prop)
  })

  it('fice matches expected reference values', () => {
    let input = new BN ('123456789')
    let output = new BN('2060458291')
    expect(fice(input).eq(output)).to.equal(true)

    input = new BN('15663360')
    output = new BN('1195593620')
    expect(fice(input).eq(output)).to.equal(true)
  })

  it('teil matches expected reference values', () => {
    let input = new BN('2060458291')
    let output = new BN ('123456789')
    expect(teil(input).eq(output)).to.equal(true)

    input = new BN('1195593620')
    output = new BN('15663360')
    expect(teil(input).eq(output)).to.equal(true)
  })
})

