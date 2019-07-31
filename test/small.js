const BN = require('bn.js')
const { expect } = require('chai')
const isEqual = require('lodash.isequal')

const { Fe, Fen } = require('../src/internal/ob')

const u_a = new BN(Math.pow(2, 2) - 1)
const u_b = new BN(Math.pow(2, 2))
const u_c = u_a.mul(u_b)

const eff = (j, m) => {
  let v0 = [5, 9, 2, 6, 4, 0, 8, 7, 1, 10, 3, 11]
  let v1 = [2, 1, 0, 3, 10, 4, 9, 5, 7, 11, 6, 8]
  let v2 = [10, 6, 7, 1, 0, 11, 3, 9, 5, 2, 8, 4]
  let v3 = [11, 0, 3, 5, 9, 8, 6, 10, 4, 1, 2, 7]

  return (
      j === 0
    ? new BN(v0[m])
    : j === 1
    ? new BN(v1[m])
    : j === 2
    ? new BN(v2[m])
    : new BN(v3[m])
  )
}

const feis = arg =>
  Fe(4, u_a, u_b, u_c, eff, new BN(arg))

const tail = arg =>
  Fen(4, u_a, u_b, u_c, eff, new BN(arg))

// test

describe('feis/tail (small input space)', () => {

  const emm = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  const perm = emm.map(x => feis(x).toNumber())
  const inv  = perm.map(x => tail(x).toNumber())
  const distincts = perm.filter((x, i, a) => a.indexOf(x) === i)

  it('feis produces distinct outputs', () => {
    expect(distincts.length).to.equal(perm.length)
  })

  it('feis permutes the input space', () => {
    expect(perm.reduce((acc, x) => emm.includes(x) && acc, true))
    .to.equal(true)
  })

  it('tail inverts feis', () => {
    expect(isEqual(emm, inv)).to.equal(true)
  })

})
