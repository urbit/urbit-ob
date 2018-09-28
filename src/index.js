/*
 * Utility methods
 */

const bnjs = require('bn.js')
const { reduce, isUndefined, isString, every, map } = require('lodash')

const raku = [
  3077398253,
  3995603712,
  2243735041,
  1261992695,
]

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

// groups suffixes into array of syllables
const suffixes = suf.match(/.{1,3}/g)

// groups prefixes into array of syllables
const prefixes = pre.match(/.{1,3}/g)

// Get item at an index in array
const getAt = (arr, index) => arr[index]

// Gets the length of an array
const len = arr => arr.length

// gets the last index as an int from an array
const lid = arr => arr.length - 1

// wraps indexOf
const indexOf = (arr, str) => arr.indexOf(str)

// is a int odd?
const isOdd = n => n % 2 !== 0

// is a int even?
const isEven = n => !isOdd(n)

// Makes an array of length num populated with its indices
const seq = n => Array.from(Array(n), (x, i) => i)

// Gets the prefix at an index
const getPrefix = i => getAt(prefixes, i)

// Gets the suffix at an index
const getSuffix = i => getAt(suffixes, i)

// Checks if a syllable exists in both suffixes and prefixes
const doesExist = str => [...suffixes, ...prefixes].includes(str)

// Checks if a suffix exists
const doesSuffixExist = str => suffixes.includes(str)

// Checks if a prefix exists
const doesPrefixExist = str => prefixes.includes(str)

// Gets the index of a prefix
const getPrefixIndex = str => indexOf(prefixes, str)

// Gets the index of a suffix
const getSuffixIndex = str => indexOf(suffixes, str)

// converts a binary string to a base-10 integer
const bin2dec = str => parseInt(str, 2).toString(10)

// converts a base-10 integer to a binary string
const dec2bin = num => num.toString(2)

// converts an @P syllable index to a binary string
const syl2bin = index => dec2bin(index).padStart(8, '0')

// converts a @P string to an array of syllables
const patp2arr = p => p.replace(/[\^~-]/g,'').match(/.{1,3}/g)

// converts an array of syllables to a string @P
const arr2patp = a => reduce(a, (acc, syl, i) => isEven(i)
  ? i === 0
    ? `~${acc}${syl}`
      ? i === 16
      : `${acc}^${syl}`
    : `${acc}-${syl}`
  : `${acc}${syl}`
, '')


const feen = pyn => {
  if (pyn >= 0x10000 && pyn <= 0xFFFFFFFF) {
    const tmp = fice(pyn - 0x10000) + 0x10000
    return tmp
  }
  if (pyn >= 0x100000000 && pyn <= 0xffffffffffffffff) {
    const f = new bnjs('4294967295')
    const g = new bnjs('18446744069414584000')
    const lo = pyn.and(f)
    const hi = pyn.and(g)
    let next = new bnjs(feen(lo))
    return hi.or(next)
  }
  return pyn
}


const fend = cry => {
  if (cry >= 0x10000 && cry <= 0xFFFFFFFF) {
    const res = new bnjs(teil(cry - 0x10000))
    const resNum = res.add(new bnjs(65536)).toNumber()
    return resNum
  }
  if (cry >= 0x100000000 && cry <= bn(0xffffffffffffffff)) {
    const cryBn = new bnjs(cry)
    const lo = cryBn.and(new bnjs('0xFFFFFFFF'))
    const hi = cryBn.and(new bnjs('0xffffffff00000000'))
    const res = hi.or(fend(lo))
    return res.toNumber()
  }
  return cry
}



const fice = nor => {
  let sel = [
    nor % 65535,
    nor / 65535
  ]
  for (var i = 0; i < 4; i++) {
    sel = rynd(i, sel[0], sel[1])
  }

  const res = 65535 * sel[0] + sel[1]
  return res
}


const teil = vip => {
  let sel = [
    vip % 65535,
    vip / 65535
    //vip % 0xFFFF,
    //vip / 0x10000
  ]
  // maybe the for loops got borked in lua conversion
  for (var i = 3; i > -1; i--) {
    sel = rund(i, sel[0], sel[1])
  }
  //var res = bn(bn(0xFFFF).mul(sel[0])).add(sel[1])
  const r1 = new bnjs(65535)
  const res = r1.mul(new bnjs(sel[0])).add(new bnjs(sel[1]))
  return res.toNumber()
}


const rynd = (n, l, r) => {
  l = Math.floor(l)
  const res = [r, 0]
  const m = isEven(n)
    ? new bnjs(65535)
    : new bnjs(65536)

  //res[1] = (bn(muk(raku[n], 2, r)).add(l)) % m
  const r1 = new bnjs(muk(raku[n], 2, r))
  const r2 = r1.add(new bnjs(l)).mod(m)
  res[1] = r2.toNumber()
  return res
}


const rund = (n, l, r) => {
  l = Math.floor(l)
  const res = [r, 0]
  const m = isEven(n)
    ? new bnjs(65535)
    : new bnjs(65536)
  const h = new bnjs(muk(raku[n], 2, r))
  const r1 = new bnjs(m + l)
  const r2 = r1.sub(h.mod(m)).mod(m).toString()
  res[1] = r2
  return res
}


const muk = (syd, len, key) => {
  //key = bn(key)
  const lo = key & 0xFF
  const hi = (key & 0xFF00) / 256
  const res = murmur3(String.fromCharCode(lo) + String.fromCharCode(hi), syd)
  return res
}


const murmur3 = (data, seed) => {
  if (!seed) seed = 0

  const c1 = new bnjs(3432918353)
  const c2 = new bnjs(461845907)

  const f = 4294967295

  const length = new bnjs(len(data))
  let h1 = new bnjs(seed)
  let k1
  const roundedEnd = length & 0xFFFFFFFC
  // this will likely need to be redone with bignum
  for (var i = 0; i < roundedEnd; i += 4) {
    var x = data.charCodeAt(i + 3) ? data.charCodeAt(i + 3) : 0
    k1 = bn(data.charCodeAt(i) & 0xFF)
      | ((data.charCodeAt(i + 1) & 0xFF) << 8)
      | ((data.charCodeAt(i + 2) & 0xFF) << 16)
      | (x << 24)
    k1 = k1 * c1
    k1 = (k1 << 15) | ((k1 & 0xFFFFFFFF) >> 17)
    k1 = k1 * c2
    h1 = h1 ^ k1
    h1 = (h1 << 13) | ((h1 & 0xFFFFFFFF) >> 19)
    h1 = h1 * 5 + 3864292196
  }

  k1 = 0
  const val = length & 0x03
  if (val == 3) {
    k1 = (data.charCodeAt(roundedEnd + 2) & 0xFF) << 16
  }
  if (val == 3 || val == 2) {
    k1 = k1 | (data.charCodeAt(roundedEnd + 1) & 0xFF) << 8
  }
  if (val == 3 || val == 2 || val == 1) {
    k1 = k1 | (data.charCodeAt(roundedEnd) & 0xFF)
    k1 = new bnjs(k1 * c1)
    var k2 = new bnjs(k1.and(new bnjs(f)).shrn(17))
    k1 = k1.shln(15).or(k2)
    k1 = k1.mul(c2)
    h1 = h1.xor(k1)
  }
  h1 = h1.xor(length)
  h1 = h1.xor(h1.and(new bnjs(f)).shrn(16))
  h1 = h1.mul(new bnjs(2246822507))
  h1 = h1.xor(h1.and(new bnjs(f)).shrn(13))
  h1 = h1.mul(new bnjs(3266489909))
  h1 = h1.xor(h1.and(new bnjs(f)).shrn(16))
  return h1.and(new bnjs(f)).toNumber()
}


/*
 * Public methods
 *  -- patp2add ( ship name )
 *  --   => address number
 *  -- to{Galaxy,Star,Planet}Ship ( address number )
 *  --   => ship name
 *  ####################### NOT YET IMPLEMENTED ##########################
 *  -- clan ( ship name or address number (int or bn) )
 *  --   => "galaxy", "star", "planet", "moon" or "comet"
 *  -- sein ( ship name or address number (int or bn) )
 *  --   => parent name or address number
 *
 */

const bex = (n) => {
  const two = new bnjs(2)
  return two.pow(n)
}

const rsh = (a, b, c) => {
  const sub = bex(a).mul(b)
  return c.div(bex(sub))
}

const met = (a, b, c = new bnjs(0)) => {
  const zero = new bnjs(0)
  const one = new bnjs(1)
  return b.eq(zero)
    ? c
    : met(a, rsh(a, one, b), c.add(one))
}

const end = (a, b, c) => {
  return c.mod(bex(bex(a).mul(b)))
}

const lsh = (a, b, c) => {
  const sub = bex(a).mul(b)
  return bex(sub).mul(c)
}

// bignum patp
const patp = (n) => {
  const zero = new bnjs(0)
  const one = new bnjs(1)
  const three = new bnjs(3)
  const four = new bnjs(4)

  let sxz = new bnjs(feen(n))
  let dyy = met(four, sxz)

  let loop = (tsxz, timp, trep) => {
    let log = end(four, one, tsxz)
    let pre = getPrefix(rsh(three, one, log))
    let suf = getSuffix(end(three, one, log))
    let etc =
      (timp.mod(four)).eq(zero)
        ? timp.eq(zero)
          ? ''
          : '--'
        : '-'

    let res = pre + suf + etc + trep

    return timp.eq(dyy)
      ? trep
      : loop(rsh(four, one, tsxz), timp.add(one), res)
  }

  let dyx = met(three, sxz)

  return '~' +
    (dyx.lte(one)
    ? getSuffix(sxz)
    : loop(sxz, zero, ''))
}

// returns the class of a ship from it's name
const tierOfpatp = name => {
  const l = len(patp2arr(name))
  if (l <= 1) return 'galaxy'
  if (l <= 2) return 'star'
  if (l <= 4) return 'planet'
  if (l <= 8) return 'moon'
  if (l <= 16) return 'comet'
  return 'invalid'
}


const tierOfadd = addr => {
  const b = len(dec2bin(addr))
  if (b <= 8) return 'galaxy'
  if (b <= 16) return 'star'
  if (b <= 32) return 'planet'
  if (b <= 64) return 'moon'
  if (b <= 128) return 'comet'
  return 'invalid'
}


const add2patp = addr => {
  const b = len(dec2bin(addr))
  if (b <= 8) return toGalaxyName(addr)
  if (b <= 16) return toStarName(addr)
  if (b <= 32) return toPlanetName(addr)
  if (b <= 64) console.error('Convert to moon not currently supported.')
  if (b <= 128) console.error('Convert to comet not currently supported.')
  return 'invalid'
}


// converts a string @P into an integer address
const patp2add = (name, unscramble) => {

  // set a default true value for unscramble
  if (isUndefined(unscramble)) unscramble = true

  // if the name is invalid, return undefined
  if (!isValidName(name)) return

  // if the name is a string, convert to array of syllables
  if (isString(name)) name = patp2arr(name)

  // concat 8 bit binary numbers of syllable indexes
  const addr = reduce(name, (acc, syl, index) => {
      return isOdd(index) || len(name) === 1
        ? acc + syl2bin(getSuffixIndex(syl))
        : acc + syl2bin(getPrefixIndex(syl))
  }, '')

  // convert back to base 10
  const addrInt = bin2dec(addr)

  // if unscramble is true, use fend()
  return unscramble
    ? fend(addrInt)
    : addrInt
}


// Checks if a string @P is valid
const isValidName = name => {
  // convert string @P to array of syllables
  const sylArr = patp2arr(name)

  // Quickly fail if length of @p is greater than 1 and odd
  if (isOdd(len(sylArr)) && len(sylArr) !== 1) return false

  // check if each syllable exists
  const tests = map(sylArr, (syl, index) => isOdd(index) || len(sylArr) === 1
    ? doesSuffixExist(syl)
    : doesPrefixExist(syl))

  // if all syllables exist, return true, if any single syllables don't exist,
  // return false
  return every(tests, test => test === true)
}


// converts a galaxy address to a string @P
const toGalaxyName = galaxy => _add2patp(galaxy, 1)


// converts a star address to a string @P
const toStarName = star => _add2patp(star, 2)


// converts a planet address to a string @P
const toPlanetName = (scrambled, scramble) => {
  if (isUndefined(scramble)) scramble = true
  return _add2patp(scrambled, 4, scramble)
}


// converts an integer address to a string @P
const _add2patp = (addr, minBytes, scramble) => {
  if (isUndefined(scramble)) scramble = true

  if (!minBytes) {
    if (addr < 0x100) {
      minBytes = 1
    } else if (addr < 0x10000) {
      minBytes = 2
    } else {
      minBytes = 4
    }
  }

  if (minBytes === 4 && scramble) addr = feen(addr)

  const name = reduce(seq(minBytes), (acc, index) => {
    const byt = Math.floor(addr % 256)

    addr = addr / 256

    const syllable = isOdd(index)
      ? getPrefix(byt)
      : getSuffix(byt)

    return index === 2
      ? acc = syllable + '-' + acc
      : acc = syllable + acc
  }, '')

  return name
}


module.exports = {
  patp2add: patp2add,
  add2patp: add2patp,

  tierOfpatp: tierOfpatp,
  tierOfadd: tierOfadd,

  toGalaxyName: toGalaxyName,
  toStarName: toStarName,
  toPlanetName: toPlanetName,
  isValidName: isValidName,

  patp: patp,

  _add2patp: _add2patp,
  _getsuffix: getSuffix,
  _muk: muk,
  _feen: feen,
  _fend: fend,
  _teil: teil,
  _getAt: getAt,
  _len: len,
  _lid: lid,
  _indexOf: indexOf,
  _isOdd: isOdd,
  _isEven: isEven,
  _seq: seq,
  _getPrefix: getPrefix,
  _getSuffix: getSuffix,
  _doesExist: doesExist,
  _doesSuffixExist: doesSuffixExist,
  _doesPrefixExist: doesPrefixExist,
  _getPrefixIndex: getPrefixIndex,
  _getSuffixIndex: getSuffixIndex,
  _bin2dec: bin2dec,
  _dec2bin: dec2bin,
  _syl2bin: syl2bin,

  _arr2patp: arr2patp
}
