
const co = require('./internal/co')
const ob = require('./internal/ob')

/**
 * Remove all leading zero bytes from a hex-encoded string.
 * @param  {string}  str a hex encoded string
 * @return  {string}
 */
const removeLeadingZeroBytes = str =>
  str.slice(0, 2) === '00'
  ? removeLeadingZeroBytes(str.slice(2))
  : str

/**
 * Equality comparison, modulo leading zero bytes.
 * @param  {string}  s a hex-encoded string
 * @param  {string}  t a hex-encoded string
 * @return  {bool}
 */
const eqModLeadingZeroBytes = (s, t) =>
  removeLeadingZeroBytes(s) === removeLeadingZeroBytes(t)

/**
 * Equality comparison on @q values.
 * @param  {string}  p a @q-encoded string
 * @param  {string}  q a @q-encoded string
 * @return  {bool}
 */
const eqPatq = (p, q) => {
  const phex = co.patq2hex(p)
  const qhex = co.patq2hex(q)
  return eqModLeadingZeroBytes(phex, qhex)
}

module.exports = Object.assign(
  co,
  ob,
  { eqPatq }
)

