// ++  co
//
// See arvo/sys/hoon.hoon.

const BN = require('bn.js')
const lodash = require('lodash')

const ob = require('./ob')

const zero = new BN(0)
const one = new BN(1)
const two = new BN(2)
const three = new BN(3)
const four = new BN(4)
const five = new BN(5)

const pre = `
dozmarbinwansamlitsighidfidlissogdirwacsabwissib\
rigsoldopmodfoglidhopdardorlorhodfolrintogsilmir\
holpaslacrovlivdalsatlibtabhanticpidtorbolfosdot\
losdilforpilramtirwintadbicdifrocwidbisdasmidlop\
rilnardapmolsanlocnovsitnidtipsicropwitnatpanmin\
ritpodmottamtolsavposnapnopsomfinfonbanmorworsip\
ronnorbotwicsocwatdolmagpicdavbidbaltimtasmallig\
sivtagpadsaldivdactansidfabtarmonranniswolmispal\
lasdismaprabtobrollatlonnodnavfignomnibpagsopral\
bilhaddocridmocpacravripfaltodtiltinhapmicfanpat\
taclabmogsimsonpinlomrictapfirhasbosbatpochactid\
havsaplindibhosdabbitbarracparloddosbortochilmac\
tomdigfilfasmithobharmighinradmashalraglagfadtop\
mophabnilnosmilfopfamdatnoldinhatnacrisfotribhoc\
nimlarfitwalrapsarnalmoslandondanladdovrivbacpol\
laptalpitnambonrostonfodponsovnocsorlavmatmipfip\
`

const suf = `
zodnecbudwessevpersutletfulpensytdurwepserwylsun\
rypsyxdyrnuphebpeglupdepdysputlughecryttyvsydnex\
lunmeplutseppesdelsulpedtemledtulmetwenbynhexfeb\
pyldulhetmevruttylwydtepbesdexsefwycburderneppur\
rysrebdennutsubpetrulsynregtydsupsemwynrecmegnet\
secmulnymtevwebsummutnyxrextebfushepbenmuswyxsym\
selrucdecwexsyrwetdylmynmesdetbetbeltuxtugmyrpel\
syptermebsetdutdegtexsurfeltudnuxruxrenwytnubmed\
lytdusnebrumtynseglyxpunresredfunrevrefmectedrus\
bexlebduxrynnumpyxrygryxfeptyrtustyclegnemfermer\
tenlusnussyltecmexpubrymtucfyllepdebbermughuttun\
bylsudpemdevlurdefbusbeprunmelpexdytbyttyplevmyl\
wedducfurfexnulluclennerlexrupnedlecrydlydfenwel\
nydhusrelrudneshesfetdesretdunlernyrsebhulryllud\
remlysfynwerrycsugnysnyllyndyndemluxfedsedbecmun\
lyrtesmudnytbyrsenwegfyrmurtelreptegpecnelnevfes\
`

const splitAt = (index, str) => [str.slice(0, index), str.slice(index)]

const prefixes = pre.match(/.{1,3}/g)

const suffixes = suf.match(/.{1,3}/g)

const bex = (n) =>
  two.pow(n)

const lsh = (a, b, c) =>
  bex(bex(a).mul(b)).mul(c)

const rsh = (a, b, c) =>
  c.div(bex(bex(a).mul(b)))

const met = (a, b, c = zero) =>
  b.eq(zero)
  ? c
  : met(a, rsh(a, one, b), c.add(one))

const end = (a, b, c) =>
  c.mod(bex(bex(a).mul(b)))

/**
 * Convert a number to a @p-encoded string.
 *
 * @param  {String, Number, BN}  arg
 * @return  {String}
 */
const patp = (arg) => {
  const n = new BN(arg)

  const sxz = ob.feen(n)
  const dyy = met(four, sxz)

  const loop = (tsxz, timp, trep) => {
    const log = end(four, one, tsxz)
    const pre = prefixes[rsh(three, one, log)]
    const suf = suffixes[end(three, one, log)]
    const etc =
      (timp.mod(four)).eq(zero)
        ? timp.eq(zero)
          ? ''
          : '--'
        : '-'

    const res = pre + suf + etc + trep

    return timp.eq(dyy)
      ? trep
      : loop(rsh(four, one, tsxz), timp.add(one), res)
  }

  const dyx = met(three, sxz)

  return '~' +
    (dyx.lte(one)
    ? suffixes[sxz]
    : loop(sxz, zero, ''))
}

/**
 * Convert a hex-encoded string to a @p-encoded string.
 *
 * @param  {String}  hex
 * @return  {String}
 */
const hex2patp = (hex) =>
  patp(new BN(hex, 'hex'))

/**
 * Convert a @p-encoded string to a hex-encoded string.
 *
 * @param  {String}  name @p
 * @return  {String}
 */
const patp2hex = (name) => {
  const arr =
    name.replace(/[\^~-]/g,'').match(/.{1,3}/g)

  const syl2bin = idx =>
    idx.toString(2).padStart(8, '0')

  const addr = lodash.reduce(arr, (acc, syl, idx) =>
    idx % 2 !== 0 || arr.length === 1
      ? acc + syl2bin(suffixes.indexOf(syl))
      : acc + syl2bin(prefixes.indexOf(syl)),
  '')

  const bn = new BN(addr, 2)
  return ob.fend(bn).toString('hex')
}

/**
 * Convert a @p-encoded string to a bignum.
 *
 * @param  {String}  name @p
 * @return  {BN}
 */
const patp2bn = name =>
  new BN(patp2hex(name), 'hex')

/**
 * Convert a @p-encoded string to a decimal-encoded string.
 *
 * @param  {String}  name @p
 * @return  {String}
 */
const patp2dec = name =>
  patp2bn(name).toString()

/**
 * Convert a number to a @q-encoded string.
 *
 * @param  {String, Number, BN}  arg
 * @return  {String}
 */
const patq = (arg) => {
  const n = new BN(arg)

  const buf = n.toArrayLike(Buffer)

  const chunked =
    buf.length % 2 !== 0 && buf.length > 1
    ? lodash.concat([[buf[0]]], lodash.chunk(buf.slice(1), 2))
    : lodash.chunk(buf, 2)

  const prefixName = byts =>
    lodash.isUndefined(byts[1])
    ? prefixes[0] + suffixes[byts[0]]
    : prefixes[byts[0]] + suffixes[byts[1]]

  const name = byts =>
    lodash.isUndefined(byts[1])
    ? suffixes[byts[0]]
    : prefixes[byts[0]] + suffixes[byts[1]]

  const alg = pair =>
    pair.length % 2 !== 0 && chunked.length > 1
    ? prefixName(pair)
    : name(pair)

  return chunked.reduce((acc, elem) =>
    acc + (acc === '~' ? '' : '-') + alg(elem), '~')
}

/**
 * Convert a hex-encoded string to a @q-encoded string.
 *
 * @param  {String}  hex
 * @return  {String}
 */
const hex2patq = hex =>
  patq(new BN(hex, 'hex'))

/**
 * Convert a @q-encoded string to a hex-encoded string.
 *
 * Note that this preserves leading zero bytes.
 *
 * @param  {String}  name @q
 * @return  {String}
 */
const patq2hex = str => {
  const chunks = lodash.split(str.slice(1), '-')
  const dec2hex = dec =>
    dec.toString(16).padStart(2, '0')

  const splat = lodash.map(chunks, chunk => {
    let syls = splitAt(3, chunk)
    return syls[1] === ''
      ? dec2hex(suffixes.indexOf(syls[0]))
      : dec2hex(prefixes.indexOf(syls[0])) +
        dec2hex(suffixes.indexOf(syls[1]))
  })

  return str.length === 0
    ? '00'
    : splat.join('')
}

/**
 * Convert a @q-encoded string to a bignum.
 *
 * @param  {String}  name @q
 * @return  {BN}
 */
const patq2bn = name =>
  new BN(patq2hex(name), 'hex')

/**
 * Convert a @q-encoded string to a decimal-encoded string.
 *
 * @param  {String}  name @q
 * @return  {String}
 */
const patq2dec = name =>
  patq2bn(name).toString()

/**
 * Determine the ship class of a @p value.
 *
 * @param  {String}  @p
 * @return  {String}
 */
const clan = who => {
  const name = patp2bn(who)
  const wid = met(three, name)
  return wid.lte(one)
    ? 'galaxy'
    : wid.eq(two)
    ? 'star'
    : wid.lte(four)
    ? 'planet'
    : wid.lte(new BN(8))
    ? 'moon'
    : 'comet'
}


/**
 * Determine the parent of a @p value.
 *
 * @param  {String}  @p
 * @return  {String}
 */
const sein = (name) => {
  const mir = clan(name)
  const who = patp2bn(name)
  const res =
    mir === 'galaxy'
    ? who
    : mir === 'star'
    ? end(three, one, who)
    : mir === 'planet'
    ? end(four, one, who)
    : mir === 'moon'
    ? end(five, one, who)
    : zero
  return patp(res)
}

module.exports = {
  patp,
  patp2hex,
  patp2dec,
  hex2patp,
  patq,
  patq2hex,
  patq2dec,
  hex2patq,
  clan,
  sein
}
