const BN = require('bn.js')

const u_a = new BN(3)
const u_b = new BN(4)
const u_c = new BN(12)

const emm = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

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

// NOTE this appears to be a correct implementation
const fe = (r, a, b, m) => {
  const loop = (j, ell, arr) => {
    if (j > r) {
      return (
          r % 2 !== 0
        ? a.mul(ell).add(arr)
        : a.mul(arr).add(ell)
      )
    } else {
      const f = eff(4 - j - 1, arr)

      const tmp =
          j % 2 !== 0
        ? ell.add(f).mod(a)
        : ell.add(f).mod(b)

      return loop(j + 1, arr, tmp)
    }
  }

  const L = m.mod(a)
  const R = m.div(a)

  return loop(1, L, R)
}

const Fe = (r, a, b, k, m) => {
  const c = fe(r, a, b, m)
  return (
      c.lt(k)
    ? c
    : fe(r, a, b, c)
  )
}

const feis = arg =>
  Fe(4, u_a, u_b, u_c, new BN(arg))

module.exports = {
  eff,
  emm,
  fe,
  Fe,
  feis
}
