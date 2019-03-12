const BN = require('bn.js')
const { expect } = require('chai');
const jsc = require('jsverify')
const { isEqual } = require('lodash')
const {
  feen,
  fein,
  fend,
  fynd,
  fice,
  feis,
  teil,
  tail,
  rynd,
  rund
  } = require('../src/internal/ob')

const uint32 = jsc.uint32.smap(
  (num) => new BN(num),
  (bn) => bn.toNumber()
)

const planets =
  jsc.number(Math.pow(2, 16), Math.pow(2, 32) - Math.pow(2, 16) - 1).smap(
    (num) => new BN(num),
    (bn) => bn.toNumber()
)

describe('feen/fend', () => {
  it('feen and fend are inverses', () => {
    let prop = jsc.forall(uint32, bn =>
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

describe('fein/fynd', () => {
  it('fein and fynd are inverses', () => {
    let prop = jsc.forall(uint32, bn =>
      fynd(fein(bn)).eq(bn) && fein(fynd(bn)).eq(bn))

    jsc.assert(prop, { tests: 100000 })
  })

  it('fein matches expected reference values', () => {
    let input = new BN('123456789')
    let output = new BN('249127493')
    expect(fein(input).eq(output)).to.equal(true)

    input = new BN('15663360')
    output = new BN('148913959')
    expect(fein(input).eq(output)).to.equal(true)
  })

  it('fynd matches expected reference values', () => {
    let input = new BN('249127493')
    let output = new BN('123456789')
    expect(fynd(input).eq(output)).to.equal(true)

    input = new BN('148913959')
    output = new BN('15663360')
    expect(fynd(input).eq(output)).to.equal(true)
  })
})

describe('fice/teil', () => {
  it('fice and teil are inverses', () => {
    let prop = jsc.forall(uint32, bn =>
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

describe('feis/tail', () => {
  it('feis and tail are inverses over the space of planets', () => {
    let prop = jsc.forall(planets, bn =>
      feis(tail(bn)).eq(bn) && tail(feis(bn)).eq(bn)
    )

    jsc.assert(prop, { tests: 100000 } )
  })

  it('feis matches expected reference values', () => {
    let input = new BN ('123456789')
    let output = new BN('2483218125')
    expect(feis(input).eq(output)).to.equal(true)

    input = new BN('15663360')
    output = new BN('2530652268')
    expect(feis(input).eq(output)).to.equal(true)
  })

  it('tail matches expected reference values', () => {
    let input = new BN('2483218125')
    let output = new BN ('123456789')
    expect(tail(input).eq(output)).to.equal(true)

    input = new BN('2530652268')
    output = new BN('15663360')
    expect(tail(input).eq(output)).to.equal(true)
  })
})

