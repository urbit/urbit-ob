const BN = require('bn.js')
const { expect } = require('chai')

const { Fe } = require('../src/internal/ob')

const u_a = new BN(Math.pow(2, 4) - 1)
const u_b = new BN(Math.pow(2, 4))
const u_c = u_a.mul(u_b)

const emm = [
  0,   1,   2,   3,   4,   5,   6,   7,   8,   9,  10,  11,  12,  13,  14,  15,
  16,  17, 18,  19,  20,  21,  22,  23,  24,  25,  26,  27,  28,  29,  30,  31,
  32,  33,  34,  35, 36,  37,  38,  39,  40,  41,  42,  43,  44,  45,  46,  47,
  48,  49,  50,  51,  52,  53, 54,  55,  56,  57,  58,  59,  60,  61,  62,  63,
  64,  65,  66,  67,  68,  69,  70,  71, 72,  73,  74,  75,  76,  77,  78,  79,
  80,  81,  82,  83,  84,  85,  86,  87,  88,  89, 90,  91,  92,  93,  94,  95,
  96,  97,  98,  99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111,
  112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127,
  128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143,
  144, 145, 146, 147, 148, 149, 150, 151, 152, 153, 154, 155, 156, 157, 158, 159,
  160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 174, 175,
  176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191,
  192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207,
  208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223,
  224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239
  ]

const v0 = [
  106,  54,  57, 110, 216, 157,  90, 138, 148, 205, 214, 229,  25, 104, 217,  70,  16,  91,
  180, 108, 189, 176,  67, 213, 154, 194, 122, 199, 136, 140,  36,  56,  87, 112,   8,  34,
   14, 171, 227, 160, 211, 228,  37, 121, 119,  65, 132,  45, 224,  61, 141,  59,  82,  77,
   74,  20, 130, 181, 123, 186, 166,  42,  81, 172, 105, 196,  44, 135, 156, 192, 116,  39,
    7,  40,  84, 169, 193, 131,  88, 142,  24, 128,  38, 222, 197, 218, 159,  30, 145,  58,
   53,  85,  62,  49, 158,  86,  72, 210, 225,  52,  73, 149, 143, 195, 124, 179, 219,   9,
  200,  64,  51,  48,  26, 234,  27, 232, 231, 153, 190, 133, 109, 126,   6, 178, 183, 151,
  117,  46, 161,  43, 185, 236, 127,  89, 223,  23,  69,  68, 209, 139,  19,  33,  79, 164,
  207,  50, 144,  31, 134, 170,  29, 107, 220, 184,  47, 103, 206, 201, 175, 125,  35, 114,
  146,  10,  55, 152,  98,   1, 168, 215,  28, 237, 101,  17, 155, 118,  83, 147, 115, 100,
  233,   4,  66,   0, 150, 203,  22,   5, 174,  11,  18, 177,   3, 165,  99, 167, 202, 212,
  163, 182,  80, 162,  71,  97,  12,  60, 113, 221, 204,  41, 226, 187,  63, 230,   2, 188,
  208,  76, 191, 235,  93,  13, 111, 238,  78, 198,  21,  92,  95,  94,  96, 102, 120, 239,
  32,  129,  15, 173, 137,  75
  ]

const eff = (_, m) => new BN(v0[m])

const feis = arg =>
  Fe(4, u_a, u_b, u_c, eff, new BN(arg))

// test

describe('feis -- medium input space', () => {

  const perm = emm.map(x => feis(x).toString())
  const distincts = perm.filter((x, i, a) => a.indexOf(x) === i)

  it('produces distinct outputs', () => {
    expect(distincts.length).to.equal(perm.length)
  })

  it('permutes the input space', () => {
    expect(perm.reduce((acc, x) => emm.includes(parseInt(x)) && acc, true))
    .to.equal(true)
  })

})

