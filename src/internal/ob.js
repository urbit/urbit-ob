// ++  ob
//
// See arvo/sys/hoon.hoon.

const BN = require('bn.js')
const { muk } = require('./muk')

const ux_1_0000 = new BN('10000', 'hex')
const ux_ffff_ffff = new BN('ffffffff', 'hex')
const ux_1_0000_0000 = new BN('100000000', 'hex')
const ux_ffff_ffff_ffff_ffff = new BN('ffffffffffffffff', 'hex')
const ux_ffff_ffff_0000_0000 = new BN('ffffffff00000000', 'hex')

const u_65535 = new BN('65535')
const u_65536 = new BN('65536')

// PRF seeds
const raku = [
  0xb76d5eed,
  0xee281300,
  0x85bcae01,
  0x4b387af7,
]

// a PRF for j in { 0, .., 3 }
const F = (j, arg) =>
  muk(raku[j], 2, arg)

/**
 * Conceal structure v3.
 *
 * @param {String, Number, BN} pyn
 * @return  {BN}
 */
const fein = (arg) => {
  const loop = (pyn) => {
    const lo = pyn.and(ux_ffff_ffff)
    const hi = pyn.and(ux_ffff_ffff_0000_0000)

    return pyn.gte(ux_1_0000) && pyn.lte(ux_ffff_ffff)
      ? ux_1_0000.add(feis(pyn.sub(ux_1_0000)))
      : pyn.gte(ux_1_0000_0000) && pyn.lte(ux_ffff_ffff_ffff_ffff)
      ? hi.or(loop(lo))
      : pyn
  }

  return loop(new BN(arg))
}

/**
 * Restore structure v3.
 *
 * @param  {String, Number, BN}  cry
 * @return  {BN}
 */
const fynd = (arg) => {
  const loop = (cry) => {
    const lo = cry.and(ux_ffff_ffff)
    const hi = cry.and(ux_ffff_ffff_0000_0000)

    return cry.gte(ux_1_0000) && cry.lte(ux_ffff_ffff)
      ? ux_1_0000.add(tail(cry.sub(ux_1_0000)))
      : cry.gte(ux_1_0000_0000) && cry.lte(ux_ffff_ffff_ffff_ffff)
      ? hi.or(loop(lo))
      : cry
  }

  return loop(new BN(arg))
}

/**
 * Conceal structure v2.
 *
 * @param  {String, Number, BN}  pyn
 * @return  {BN}
 */
const feen = (arg) => {
  const loop = (pyn) => {
    const lo = pyn.and(ux_ffff_ffff)
    const hi = pyn.and(ux_ffff_ffff_0000_0000)

    return pyn.gte(ux_1_0000) && pyn.lte(ux_ffff_ffff)
      ? ux_1_0000.add(fice(pyn.sub(ux_1_0000)))
      : pyn.gte(ux_1_0000_0000) && pyn.lte(ux_ffff_ffff_ffff_ffff)
      ? hi.or(loop(lo))
      : pyn
  }

  return loop(new BN(arg))
}

/**
 * Restore structure v2.
 *
 * @param  {String, Number, BN}  pyn
 * @return  {BN}
 */
const fend = (arg) => {
  const loop = (cry) => {
    const lo = cry.and(ux_ffff_ffff)
    const hi = cry.and(ux_ffff_ffff_0000_0000)

    return cry.gte(ux_1_0000) && cry.lte(ux_ffff_ffff)
      ? ux_1_0000.add(teil(cry.sub(ux_1_0000)))
      : cry.gte(ux_1_0000_0000) && cry.lte(ux_ffff_ffff_ffff_ffff)
      ? hi.or(loop(lo))
      : cry
  }

  return loop(new BN(arg))
}

/**
 * Generalised Feistel cipher.
 *
 * See: Black and Rogaway (2002), "Ciphers with arbitrary finite domains."
 *
 * @param  {String, Number, BN}
 * @return  {BN}
 */
const feis = arg =>
  Fe(4, u_65535, u_65536, ux_ffff_ffff, F, new BN(arg))

const Fe = (r, a, b, k, f, m) => {
  const c = fe(r, a, b, f, m)
  return (
      c.lt(k)
    ? c
    : fe(r, a, b, f, c)
  )
}

const fe = (r, a, b, f, m) => {
  const loop = (j, ell, arr) => {
    if (j > r) {
      return (
          r % 2 !== 0
        ? a.mul(ell).add(arr)
        : a.mul(arr).add(ell)
      )
    } else {
      const eff = f(j - 1, arr)

      const tmp =
          j % 2 !== 0
        ? ell.add(eff).mod(a)
        : ell.add(eff).mod(b)

      return loop(j + 1, arr, tmp)
    }
  }

  const L = m.mod(a)
  const R = m.div(a)

  return loop(1, L, R)
}

/**
 * Adapted from Black and Rogaway "Ciphers with arbitrary finite domains",
 * 2002.
 *
 * @param  {String, Number, BN}
 * @return  {BN}
 */
const fice = (arg) => {
  const nor = new BN(arg)

  const sel =
    rynd(3,
    rynd(2,
    rynd(1,
    rynd(0, [ nor.mod(u_65535), nor.div(u_65535) ]))))

  return (u_65535.mul(sel[0])).add(sel[1])
}

/**
 * Reverse 'feis'.
 *
 * @param {Number, String, BN}  arg
 * @return  {BN}
 */
const tail = arg =>
  Fen(4, u_65535, u_65536, ux_ffff_ffff, F, new BN(arg))

const Fen = (r, a, b, k, f, m) => {
  const c = fen(r, a, b, f, m)
  return (
      c.lt(k)
    ? c
    : fen(r, a, b, f, c)
  )
}

const fen = (r, a, b, f, m) => {
  const loop = (j, ell, arr) => {
    if (j < 1) {
      return a.mul(arr).add(ell)
    } else {
      const eff = f(j - 1, ell)

      // NB (jtobin):
      //
      // Slight deviation from B&R (2002) here to prevent negative values.  We
      // add 'a' or 'b' to arr as appropriate and reduce 'eff' modulo the same
      // number before performing subtraction.
      //
      const tmp =
          j % 2 !== 0
        ? arr.add(a).sub(eff.mod(a)).mod(a)
        : arr.add(b).sub(eff.mod(b)).mod(b)

      return loop(j - 1, tmp, ell)
    }
  }

  const R =
      r % 2 !== 0
    ? m.mod(a)
    : m.div(a)

  const L =
      r % 2 !== 0
    ? m.div(a)
    : m.mod(a)

  return loop(r, L, R)
}

/**
 * Reverse fice.
 *
 * @param  {String}  vip
 * @return  {BN}
 */
const teil = (arg) => {
  const vip = new BN(arg)

  const sel =
    rund(0,
    rund(1,
    rund(2,
    rund(3, [ vip.mod(u_65535), vip.div(u_65535) ]))))

  return (u_65535.mul(sel[0])).add(sel[1])
}

/**
 * Feistel round.
 *
 * @param  {Number}  n
 * @param  {Array<BN>}  [l, r]
 * @return  {Array<BN>}
 */
const rynd = (n, arr) => {
  const l = arr[0]
  const r = arr[1]
  const p = n % 2 === 0 ? u_65535 : u_65536
  return [ r, l.add(muk(raku[n], 2, r)).mod(p) ]
}

/**
 * Reverse round.
 *
 * @param  {Number}  n
 * @param  {Array<BN>}  [l, r]
 * @return  {Array<BN>}
 */
const rund = (n, arr) => {
  const l = arr[0]
  const r = arr[1]
  const p = n % 2 === 0 ? u_65535 : u_65536
  return [ r, l.add(p).sub(muk(raku[n], 2, r).mod(p)).mod(p) ]
}

module.exports = {
  feen,
  fend,
  fice,
  teil,
  rynd,
  rund,

  F,
  raku,

  fe,
  Fe,
  feis,
  fein,

  fen,
  Fen,
  tail,
  fynd

}
