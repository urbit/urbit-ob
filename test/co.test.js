const BN = require('bn.js')
const { expect } = require('chai')
const jsc = require('jsverify')
const {
  patp,
  patp2hex,
  hex2patp,
  patp2dec,
  patq,
  patq2hex,
  hex2patq,
  patq2dec,
  clan,
  sein,
  eqPatq,
  isValidPatq,
  isValidPatp
  } = require('../src/internal/co')

const patps = jsc.uint32.smap(
  num => patp(num),
  pp => parseInt(patp2dec(pp))
)

const patqs = jsc.uint32.smap(
  num => patq(num),
  pq => parseInt(patq2dec(pq))
)

describe('patp, etc.', () => {
  it('patp2dec matches expected reference values', () => {
    expect(patp2dec('~zod')).to.equal('0')
    expect(patp2dec('~lex')).to.equal('200')
    expect(patp2dec('~binzod')).to.equal('512')
    expect(patp2dec('~samzod')).to.equal('1024')
    expect(patp2dec('~poldec-tonteg')).to.equal('9896704')
    expect(patp2dec('~nidsut-tomdun')).to.equal('15663360')
    expect(patp2dec('~morlyd-mogmev')).to.equal('3108299008')
    expect(patp2dec('~fipfes-morlyd')).to.equal('479733505')
  })

  it('patp matches expected reference values', () => {
    expect(patp('0')).to.equal('~zod')
    expect(patp('200')).to.equal('~lex')
    expect(patp('512')).to.equal('~binzod')
    expect(patp('1024')).to.equal('~samzod')
    expect(patp('9896704')).to.equal('~poldec-tonteg')
    expect(patp('15663360')).to.equal('~nidsut-tomdun')
    expect(patp('3108299008')).to.equal('~morlyd-mogmev')
    expect(patp('479733505')).to.equal('~fipfes-morlyd')
  })

  it('large patp values match expected reference values', () => {
    expect(hex2patp('7468697320697320736f6d6520766572792068696768207175616c69747920656e74726f7079'))
    .to.equal('~divmes-davset-holdet--sallun-salpel-taswet-holtex--watmeb-tarlun-picdet-magmes--holter-dacruc-timdet-divtud--holwet-maldut-padpel-sivtud')
  })

  it('patp2hex throws on invalid patp', () => {
    let input = () => patp2hex('nidsut-tomdun')
    expect(input).to.throw()
    input = () => patp2hex('~nidsut-tomdzn')
    expect(input).to.throw()
    input = () => patp2hex('~sut-tomdun')
    expect(input).to.throw()
    input = () => patp2hex('~nidsut-dun')
    expect(input).to.throw()
  })

  it('patp and patp2dec are inverses', () => {
    let iso0 = jsc.forall(jsc.uint32, num =>
      parseInt(patp2dec(patp(num))) === num
    )

    let iso1 = jsc.forall(patps, pp =>
      patp(patp2dec(pp)) === pp
    )

    jsc.assert(iso0)
    jsc.assert(iso1)
  })

  it('patp2hex and hex2patp are inverses', () => {
    let iso0 = jsc.forall(jsc.uint32, num =>
      parseInt(patp2hex(hex2patp(num.toString(16))), 16) === num
    )

    let iso1 = jsc.forall(patps, pp =>
      hex2patp(patp2hex(pp)) === pp
    )

    jsc.assert(iso0)
    jsc.assert(iso1)
  })

})

describe('patq, etc.', () => {
  it('patq2dec matches expected reference values', () => {
    expect(patq2dec('~zod')).to.equal('0')
    expect(patq2dec('~binzod')).to.equal('512')
    expect(patq2dec('~samzod')).to.equal('1024')
    expect(patq2dec('~poldec-tonteg')).to.equal('4016240379')
    expect(patq2dec('~nidsut-tomdun')).to.equal('1208402137')
  })

  it('patq matches expected reference values', () => {
    expect(patq('0')).to.equal('~zod')
    expect(patq('512')).to.equal('~binzod')
    expect(patq('1024')).to.equal('~samzod')
    expect(patq('4016240379')).to.equal('~poldec-tonteg')
    expect(patq('1208402137')).to.equal('~nidsut-tomdun')
  })

  it('large patq values match expected reference values', () => {
    expect(hex2patq('01010101010101010102')).to.equal('~marnec-marnec-marnec-marnec-marbud')
    expect(hex2patq('6d7920617765736f6d65207572626974207469636b65742c206920616d20736f206c75636b79'))
    .to.equal('~tastud-holruc-sidwet-salpel-taswet-holdeg-paddec-davdut-holdut-davwex-balwet-divwen-holdet-holruc-taslun-salpel-holtux-dacwex-baltud')
  })

  it('patq2hex throws on invalid patp', () => {
    let input = () => patq2hex('nidsut-tomdun')
    expect(input).to.throw()
    input = () => patq2hex('~nidsut-tomdzn')
    expect(input).to.throw()
    input = () => patq2hex('~sut-tomdun')
    expect(input).to.throw()
    input = () => patq2hex('~nidsut-dun')
    expect(input).to.throw()
  })

  it('patq and patq2dec are inverses', () => {
    let iso0 = jsc.forall(jsc.uint32, num =>
      parseInt(patq2dec(patq(num))) === num
    )

    let iso1 = jsc.forall(patqs, pp =>
      patq(patq2dec(pp)) === pp
    )

    jsc.assert(iso0)
    jsc.assert(iso1)
  })

  it('patq2hex and hex2patq are inverses', () => {
    let iso0 = jsc.forall(jsc.uint32, num =>
      parseInt(patq2hex(hex2patq(num.toString(16))), 16) === num
    )

    let iso1 = jsc.forall(patqs, pp =>
      hex2patq(patq2hex(pp)) === pp
    )

    jsc.assert(iso0)
    jsc.assert(iso1)
  })
})

describe('clan/sein', () => {
  it('clan works as expected', () => {
    expect(clan('~zod')).to.equal('galaxy')
    expect(clan('~fes')).to.equal('galaxy')
    expect(clan('~marzod')).to.equal('star')
    expect(clan('~fassec')).to.equal('star')
    expect(clan('~dacsem-fipwex')).to.equal('planet')
    expect(clan('~fidnum-rosbyt')).to.equal('planet')
    expect(clan('~doznec-bannux-nopfen')).to.equal('moon')
    expect(clan('~dozryt--wolmep-racmyl-padpeg-mocryp')).to.equal('comet')
  })

  it('clan throws on invalid input', () => {
    let input = () => clan('~zord')
    expect(input).to.throw()
    input = () => clan('zod')
    expect(input).to.throw()
    input = () => clan('~nid-tomdun')
    expect(input).to.throw()
  })

  it('sein works as expected', () => {
    expect(sein('~zod')).to.equal('~zod')
    expect(sein('~nec')).to.equal('~nec')
    expect(sein('~rep')).to.equal('~rep')
    expect(sein('~marzod')).to.equal('~zod')
    expect(sein('~marnec')).to.equal('~nec')
    expect(sein('~fassec')).to.equal('~sec')
    expect(sein('~nidsut-tomdun')).to.equal('~marzod')
    expect(sein('~sansym-ribnux')).to.equal('~marnec')
  })

  it('sein throws on invalid input', () => {
    let input = () => sein('~zord')
    expect(input).to.throw()
    input = () => sein('zod')
    expect(input).to.throw()
    input = () => sein('~nid-tomdun')
    expect(input).to.throw()
  })

})

describe('eqPatq', () => {
  it('works as expected', () => {
    expect(eqPatq('~dozzod-dozzod', '~zod')).to.equal(true)
    expect(eqPatq('~dozzod-mardun', '~mardun')).to.equal(true)
    expect(eqPatq('~dozzod-mardun', '~mardun-dozzod')).to.equal(false)
  })
})

describe('isValidPat{q, p}', () => {
  it('isValidPatp returns true for valid @p values', () => {
    expect(isValidPatp('~zod')).to.equal(true)
    expect(isValidPatp('~marzod')).to.equal(true)
    expect(isValidPatp('~nidsut-tomdun')).to.equal(true)
  })

  it('isValidPatp returns false for invalid @p values', () => {
    expect(isValidPatp('')).to.equal(false)
    expect(isValidPatp('~')).to.equal(false)
    expect(isValidPatp('~hu')).to.equal(false)
    expect(isValidPatp('~what')).to.equal(false)
    expect(isValidPatp('sudnit-duntom')).to.equal(false)
  })

  it('isValidPatq returns true for valid @p values', () => {
    expect(isValidPatq('~zod')).to.equal(true)
    expect(isValidPatq('~marzod')).to.equal(true)
    expect(isValidPatq('~nidsut-tomdun')).to.equal(true)
    expect(isValidPatq('~dozzod-binwes-nidsut-tomdun')).to.equal(true)
  })

  it('isValidPatq returns false for invalid @p values', () => {
    expect(isValidPatq('')).to.equal(false)
    expect(isValidPatq('~')).to.equal(false)
    expect(isValidPatq('~hu')).to.equal(false)
    expect(isValidPatq('~what')).to.equal(false)
    expect(isValidPatq('sudnit-duntom')).to.equal(false)
  })
})
