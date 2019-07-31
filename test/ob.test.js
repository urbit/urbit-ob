const BN = require('bn.js')
const { expect } = require('chai');
const jsc = require('jsverify')
const isEqual = require('lodash.isequal')
const {
  fein,
  fynd,
  feis,
  tail
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

describe('fein/fynd', () => {
  it('fein and fynd are inverses', function() {
    this.timeout(5000)

    let prop = jsc.forall(uint32, bn =>
      fynd(fein(bn)).eq(bn) && fein(fynd(bn)).eq(bn))

    jsc.assert(prop, { tests: 100000 })
  })

  it('fein matches expected reference values', () => {
    let input = new BN('123456789')
    let output = new BN('1897766331')
    expect(fein(input).eq(output)).to.equal(true)

    input = new BN('15663360')
    output = new BN('1208402137')
    expect(fein(input).eq(output)).to.equal(true)
  })

  it('fynd matches expected reference values', () => {
    let input = new BN('1897766331')
    let output = new BN('123456789')
    expect(fynd(input).eq(output)).to.equal(true)

    input = new BN('1208402137')
    output = new BN('15663360')
    expect(fynd(input).eq(output)).to.equal(true)
  })
})

describe('feis/tail', () => {
  it('feis and tail are inverses over the space of planets', function() {
    this.timeout(5000)

    let prop = jsc.forall(planets, bn =>
      feis(tail(bn)).eq(bn) && tail(feis(bn)).eq(bn)
    )

    jsc.assert(prop, { tests: 100000 } )
  })

  it('feis matches expected reference values', () => {
    let input = new BN ('123456789')
    let output = new BN('2060458291')
    expect(feis(input).eq(output)).to.equal(true)

    input = new BN('15663360')
    output = new BN('1195593620')
    expect(feis(input).eq(output)).to.equal(true)
  })

  it('tail matches expected reference values', () => {
    let input = new BN('2060458291')
    let output = new BN ('123456789')
    expect(tail(input).eq(output)).to.equal(true)

    input = new BN('1195593620')
    output = new BN('15663360')
    expect(tail(input).eq(output)).to.equal(true)
  })
})
