//var assert = require('assert');
var nom = require('../index.js');
//var bn = require('bignum');

exports['test that stops execution'] = function(assert) {
  assert.equal(nom._feen(0x10100), 0x63b30e1c, 'test feen');
  assert.equal(nom._fend(0x63b30e1c), 0x10100, 'test fend');
  assert.equal(nom._muk(0, 2, 0x101), 0x42081a9b, 'test muk 1');
  assert.equal(nom._muk(0, 2, 0x201), 0x64c7667e, 'test muk 2');

  assert.equal(nom._wordtonum('zod'), 0, 'test converting one syllable word to num');
  assert.equal(nom._wordtonum('samzod'), 1024, 'test converting two syllable word to num');
  assert.equal((typeof nom._wordtonum('sambinzod')), 'undefined', 'test rejecting three syllable word to num');

  assert.equal(nom.toAddress('lex'), 200, 'convert ship name ~lex to number 200');
  assert.equal(nom.toAddress('binzod'), 512, 'convert ship name ~binzod to number 512');
  assert.equal(nom.toAddress('poldec-tonteg'), 9896704, 'convert ship name ~poldec-tonteg to number 9896704');
  assert.equal(nom._getsuffix(200), 'lex', 'gets correct suffix');
  assert.equal(nom.toGalaxyName(200), 'lex', 'convert ship num 200 to ~lex');
  assert.equal(nom.toStarName(512), 'binzod', 'convert ship num 512 to ~binzod');
  assert.equal(nom.toPlanetName(9896704), 'poldec-tonteg', 'convert number 9896704 to ship name ~poldec-tonteg');
}

if (module == require.main) require('test').run(exports);
