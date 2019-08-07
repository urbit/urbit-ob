const ob = require('../src')
const { expect } = require('chai')

describe('the public-facing API', () => {

  const zod = '~zod'
  const zoddec = '0'
  const zodhex = '00'
  const zodclan = 'galaxy'

  it('contains the appropriate exports', () => {
    expect(ob.patp(zoddec)).to.equal(zod)
    expect(ob.patp2hex(zod)).to.equal(zodhex)
    expect(ob.hex2patp(zodhex)).to.equal(zod)
    expect(ob.patp2dec(zod)).to.equal(zoddec)
    expect(ob.sein(zod)).to.equal(zod)
    expect(ob.clan(zod)).to.equal(zodclan)

    expect(ob.patq(zoddec)).to.equal(zod)
    expect(ob.patq2hex(zod)).to.equal(zodhex)
    expect(ob.hex2patq(zodhex)).to.equal(zod)
    expect(ob.patq2dec(zod)).to.equal(zoddec)

    expect(ob.eqPatq(zod, zod)).to.equal(true)
    expect(ob.isValidPatp(zod)).to.equal(true)
    expect(ob.isValidPatq(zod)).to.equal(true)
  })
})

