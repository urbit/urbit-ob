const expect = require('chai').expect;
const bnjs = require('bn.js');
const ob = require('../src');

describe('patp2add/add2patp', () => {
  it('patp2add', () => {
    expect(ob.patp2add('lex')).to.equal('200');
    expect(ob.patp2add('samzod')).to.equal('1024');
    expect(ob.patp2add('sambinzod')).to.equal(undefined);
    expect(ob.patp2add('poldec-tonteg')).to.equal(9896704)
  })

  it('add2patp', () => {
    expect(ob.add2patp(0, 1, false)).to.equal('zod');
    expect(ob.add2patp(512, 2, false)).to.equal('binzod');
    expect(ob.add2patp(9896704, 4, true)).to.equal('poldec-tonteg');
    expect(ob.add2patp(0)).to.equal('zod');
    expect(ob.add2patp(512)).to.equal('binzod');
    expect(ob.add2patp(9896704)).to.equal('poldec-tonteg');
  })
})

describe('name functions', () => {
  it('toGalaxyName/toStarName/toPlanetName', () => {
    expect(ob.toGalaxyName(200)).to.equal('lex');
    expect(ob.toStarName(512)).to.equal('binzod');
    expect(ob.toPlanetName(9896704)).to.equal('poldec-tonteg');
  })

  it('isValidName', () => {
    expect(ob.isValidName('poldec-tonteg')).to.equal(true);
    expect(ob.isValidName('aaa')).to.equal(false);
    expect(ob.isValidName('aaaaaa')).to.equal(false);
    expect(ob.isValidName('//////')).to.equal(false);
    expect(ob.isValidName('////////////')).to.equal(false);
    expect(ob.isValidName('//////-//////')).to.equal(false);
  })
})

describe('tiers', () => {
  it('tierOfPatp', () => {
    expect(ob.tierOfpatp('poldec-tonteg')).to.equal('planet');
    expect(ob.tierOfpatp('poldec')).to.equal('star');
    expect(ob.tierOfpatp('zod')).to.equal('galaxy');
    expect(ob.tierOfpatp('binzod')).to.equal('star');
    expect(ob.tierOfpatp('poldec-tonteg')).to.equal('planet');
  })

  it('tierOfadd', () => {
    expect(ob.tierOfadd(0)).to.equal('galaxy');
    expect(ob.tierOfadd(512)).to.equal('star');
    expect(ob.tierOfadd(9896704)).to.equal('planet');
  })
})

describe('@p/@q encodings', () => {
  it('@p', () => {
    expect(ob.patp('0')).to.equal('~zod');
    expect(ob.patp('4294967295')).to.equal('~dostec-risfen');
    expect(ob.patp('328256967394537077627')).to.equal('~dozsyx--halrux-samlep-posmus-ranrux');

    let input = new bnjs('7468697320697320736f6d6520766572792068696768207175616c69747920656e74726f7079', 16);
    let expected = '~divmes-davset-holdet--sallun-salpel-taswet-holtex--watmeb-tarlun-picdet-magmes--holter-dacruc-timdet-divtud--holwet-maldut-padpel-sivtud';
    expect(ob.patp(input)).to.equal(expected);
  })

  it('@q', () => {
    expect(ob.patq(new bnjs('0'))).to.equal('~zod');
    expect(ob.patq(new bnjs('0102', 'hex'))).to.equal('~marbud');
    expect(ob.patq(new bnjs('010102', 'hex'))).to.equal('~doznec-marbud');
    expect(ob.patq(new bnjs('01010101010101010102', 'hex'))).to.equal('~marnec-marnec-marnec-marnec-marbud');
    expect(ob.patq(new bnjs('6d7920617765736f6d65207572626974207469636b65742c206920616d20736f206c75636b79', 'hex'))).to.equal('~tastud-holruc-sidwet-salpel-taswet-holdeg-paddec-davdut-holdut-davwex-balwet-divwen-holdet-holruc-taslun-salpel-holtux-dacwex-baltud');
  })
})

describe('clan/sein', () => {
  it('clan works as expected', () => {
    expect(ob._clan(new bnjs(0))).to.equal('czar');
    expect(ob._clan(new bnjs(255))).to.equal('czar');
    expect(ob._clan(new bnjs(256))).to.equal('king');
    expect(ob._clan(new bnjs(50000))).to.equal('king');
    expect(ob._clan(new bnjs(70000))).to.equal('duke');
    expect(ob._clan(new bnjs(2170000))).to.equal('duke');
    expect(ob._clan(new bnjs('5232170000'))).to.equal('earl');
    expect(ob._clan(new bnjs('525525525125232170000'))).to.equal('pawn');
  })

  it('sein works as expected', () => {
    expect(ob.sein(new bnjs(0))).to.equal('zod');
    expect(ob.sein(new bnjs(1))).to.equal('nec');
    expect(ob.sein(new bnjs(250))).to.equal('rep');
    expect(ob.sein(new bnjs(256))).to.equal('zod');
    expect(ob.sein(new bnjs(257))).to.equal('nec');
    expect(ob.sein(new bnjs(50000))).to.equal('sec');
    expect(ob.sein(new bnjs(15663360))).to.equal('marzod');
    expect(ob.sein(new bnjs(15663361))).to.equal('marnec');
  })
})

