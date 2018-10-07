
const expect = require('chai').expect
const jsc = require('jsverify')
const ob = require('../src')
const bn = require('bn.js')

removeLeadingZeroBytes = str =>
  str.slice(0, 2) === '00'
  ? removeLeadingZeroBytes(str.slice(2))
  : str

eqModLeadingZeroBytes = (s, t) =>
  removeLeadingZeroBytes(s) === removeLeadingZeroBytes(t)

describe('@q encoding', () => {
  let hexString = jsc.string.smap(
    x => Buffer.from(x).toString('hex'),
    x => Buffer.from(x, 'hex').toString()
  )

  let patq = hexString.smap(
    hex => ob.patq(new bn(hex, 'hex')),
    pq => ob.patq2hex(pq)
  )

  it('patq2hex and hex2patq are inverses', () => {
    let iso0 = jsc.forall(hexString, hex =>
      eqModLeadingZeroBytes(ob.patq2hex(ob.hex2patq(hex)), hex)
    )

    let iso1 = jsc.forall(patq, str =>
      ob.hex2patq(ob.patq2hex(str)) === str
    )

    jsc.assert(iso0)
    jsc.assert(iso1)
  })
})
