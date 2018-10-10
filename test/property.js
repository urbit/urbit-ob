
const expect = require('chai').expect
const jsc = require('jsverify')
const ob = require('../src')
const bn = require('bn.js')

describe('@q encoding', () => {

  let hexString = jsc.string.smap(
    x => Buffer.from(x).toString('hex'),
    x => Buffer.from(x, 'hex').toString()
  )

  let patq = hexString.smap(ob.hex2patq, ob.patq2hex)

  it('patq2hex and hex2patq are inverses', () => {
    let iso0 = jsc.forall(hexString, hex =>
      ob._eqModLeadingZeroBytes(ob.patq2hex(ob.hex2patq(hex)), hex)
    )

    let iso1 = jsc.forall(patq, str =>
      ob.eqPatq(ob.hex2patq(ob.patq2hex(str)), str)
    )

    jsc.assert(iso0, { tests: 200 })
    jsc.assert(iso1, { tests: 200 })
  })

})
