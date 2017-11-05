'use strict';

/*
 * Utility methods
 */

var bn = require('bignum');

var raku = [
  3077398253,
  3995603712,
  2243735041,
  1261992695
];

var prefix = "dozmarbinwansamlitsighidfidlissogdirwacsabwissibrigsoldopmodfoglidhopdardorlorhodfolrintogsilmirholpaslacrovlivdalsatlibtabhanticpidtorbolfosdotlosdilforpilramtirwintadbicdifrocwidbisdasmidloprilnardapmolsanlocnovsitnidtipsicropwitnatpanminritpodmottamtolsavposnapnopsomfinfonbanmorworsipronnorbotwicsocwatdolmagpicdavbidbaltimtasmalligsivtagpadsaldivdactansidfabtarmonranniswolmispallasdismaprabtobrollatlonnodnavfignomnibpagsopralbilhaddocridmocpacravripfaltodtiltinhapmicfanpattaclabmogsimsonpinlomrictapfirhasbosbatpochactidhavsaplindibhosdabbitbarracparloddosbortochilmactomdigfilfasmithobharmighinradmashalraglagfadtopmophabnilnosmilfopfamdatnoldinhatnacrisfotribhocnimlarfitwalrapsarnalmoslandondanladdovrivbacpollaptalpitnambonrostonfodponsovnocsorlavmatmipfip"

var suffix = "zodnecbudwessevpersutletfulpensytdurwepserwylsunrypsyxdyrnuphebpeglupdepdysputlughecryttyvsydnexlunmeplutseppesdelsulpedtemledtulmetwenbynhexfebpyldulhetmevruttylwydtepbesdexsefwycburderneppurrysrebdennutsubpetrulsynregtydsupsemwynrecmegnetsecmulnymtevwebsummutnyxrextebfushepbenmuswyxsymselrucdecwexsyrwetdylmynmesdetbetbeltuxtugmyrpelsyptermebsetdutdegtexsurfeltudnuxruxrenwytnubmedlytdusnebrumtynseglyxpunresredfunrevrefmectedrusbexlebduxrynnumpyxrygryxfeptyrtustyclegnemfermertenlusnussyltecmexpubrymtucfyllepdebbermughuttunbylsudpemdevlurdefbusbeprunmelpexdytbyttyplevmylwedducfurfexnulluclennerlexrupnedlecrydlydfenwelnydhusrelrudneshesfetdesretdunlernyrsebhulrylludremlysfynwerrycsugnysnyllyndyndemluxfedsedbecmunlyrtesmudnytbyrsenwegfyrmurtelreptegpecnelnevfes"

var getsyllable = function(s, i) {
  return s.slice(i * 3, (i * 3) + 3);
};

var getprefix = function(i) {
  return getsyllable(prefix, i);
};

var getsuffix = function(i) {
  return getsyllable(suffix, i);
};

var getsyllableindex = function(str, syl) {
  var i = str.indexOf(syl);
  if (i < 0) {
    return;
  };
  return i / 3
};

var getprefixindex = function(syl) {
  return getsyllableindex(prefix, syl);
};
  
var getsuffixindex = function(syl) {
  return getsyllableindex(suffix, syl);
};

var wordtonum = function(word) {
    if (word.length == 3) {
      return 1 * getsuffixindex(word);
    } else if (word.length == 6) {
      var addr = getprefixindex(word.slice(0, 2));
      addr = addr * 0x100;
      addr = addr + getsuffixindex(word.slice(3, 5));
      return addr;
    } else {
      return;
    }
};

var feen = function(pyn) {
  console.log('feen input', pyn);
  if (pyn >= 0x10000 && pyn <= 0xFFFFFFFF) {
    var tmp = fice(pyn - 0x10000) + 0x10000;
    console.log('output of feen', tmp);
    return tmp;
  }
  if (pyn >= 0x100000000 && pyn <= 0xffffffffffffffff) {
    var lo = pyn & 0xFFFFFFFF;
    var hi = pyn & 0xffffffff00000000;
    console.log('feen recursion');
    return bn(hi).or(feen(lo));
  }
  console.log('output of feen', pyn);
  return pyn;
}

var fend = function(cry) {
  if (cry >= 0x10000 && cry <= 0xFFFFFFFF) {
    var o = bn(teil(cry - 0x10000)).add(0x10000);
    console.log('output of fend block 1', o);
    return o;
  };
  if (cry >= 0x100000000 && cry <= bn(0xffffffffffffffff)) {
    var lo = cry & 0xFFFFFFFF;
    var hi = cry & 0xffffffff00000000;
    var o = hi | fend(lo);
    console.log('output of fend block 2', o);
    return o;
  };
  console.log('output of fend block 3', cry);
  return cry;
};

var fice = function(nor) {
  console.log('input to fice', nor);
  var sel = [
    nor % 65535,
    nor / 65535
  ];
  for (var i = 0; i < 4; i++) {
    sel = rynd(i, sel[0], sel[1]);
  };

  var res = 65535 * sel[0] + sel[1];
  console.log('output of fice', res);
  return res;
};

var teil = function(vip) {
  console.log('input to teil', vip);
  var sel = [
    vip % 65535,
    vip / 65535
    //vip % 0xFFFF,
    //vip / 0x10000
  ];
  console.log('sel', sel);
  // maybe the for loops got borked in lua conversion
  for (var i = 3; i > -1; i--) {
    sel = rund(i, sel[0], sel[1]);
  };
  var res = bn(bn(0xFFFF).mul(sel[0])).add(sel[1]);
  return res;
};

var rynd = function(n, l, r) {
  //console.log('input to rynd', n, l, r);
  var res = [r, 0];
  var m = 0x10000;
  if (n % 2 == 0) {
    m = 0xFFFF;
  };
  res[1] = (bn(muk(raku[n], 2, r)).add(l)) % m;
  console.log('output to rynd', res);
  return res;
};

var rund = function(n, l, r) {
  var res = [r, 0];
  var m = 65536;
  if (n % 2 == 0) {
    m = 65535;
  };
  var h = muk(raku[n], 2, r);
  res[1] = bn(bn((m + l)).sub(bn(h).mod(m))).mod(m);
  return res
};

var muk = function(syd, len, key) {
  //key = bn(key);
  var lo = key & 0xFF;
  var hi = (key & 0xFF00) / 256;
  var res = murmur3(String.fromCharCode(lo) + String.fromCharCode(hi), syd);
  return res;
};

var murmur3 = function(data, seed) {
  if (!seed) {
    seed = 0;
  }
  var c1 = 3432918353;
  var c2 = 461845907;

  var length = data.length;
  var h1 = seed;
  var k1;
  var roundedEnd = length & 0xFFFFFFFC;
  // this will likely need to be redone with bignum
  for (var i = 0; i < roundedEnd; i += 4) {
    var x = data.charCodeAt(i + 3) ? data.charCodeAt(i + 3) : 0;
    k1 = bn(data.charCodeAt(i) & 0xFF)
      | ((data.charCodeAt(i + 1) & 0xFF) << 8)
      | ((data.charCodeAt(i + 2) & 0xFF) << 16)
      | (x << 24);
    k1 = k1 * c1;
    k1 = (k1 << 15) | ((k1 & 0xFFFFFFFF) >> 17);
    k1 = k1 * c2;
    h1 = h1 ^ k1;
    h1 = (h1 << 13) | ((h1 & 0xFFFFFFFF) >> 19);
    h1 = h1 * 5 + 3864292196;
  };

  k1 = 0;
  var val = length & 0x03;
  if (val == 3) {
    k1 = (data.charCodeAt(roundedEnd + 2) & 0xFF) << 16;
  };
  if (val == 3 || val == 2) {
    k1 = k1 | (data.charCodeAt(roundedEnd + 1) & 0xFF) << 8;
  };
  if (val == 3 || val == 2 || val == 1) {
    k1 = k1 | (data.charCodeAt(roundedEnd) & 0xFF);
    k1 = k1 * c1;
    k1 = bn(k1).shiftLeft(15).or(bn(bn(k1).and(0xffffffff)).shiftRight(17))
    k1 = bn(k1).mul(c2);
    h1 = bn(h1).xor(k1);
  };
  h1 = bn(h1).xor(length);
  h1 = bn(h1).xor(bn(bn(h1).and(0xFFFFFFFF)).shiftRight(16));
  h1 = bn(h1).mul(2246822507);
  h1 = bn(h1).xor(bn(bn(h1).and(0xFFFFFFFF)).shiftRight(13));
  h1 = bn(h1).mul(3266489909);
  h1 = bn(h1).xor(bn(bn(h1).and(0xFFFFFFFF)).shiftRight(16));
  return bn(h1).and(0xFFFFFFFF);
};

/*
 * Public methods
 *  -- toAddress ( ship name )
 *  --   => address number
 *  -- nome ( address number )
 *  --   => ship name
 *  ####################### NOT YET IMPLEMENTED ##########################
 *  -- clan ( ship name or address number (int or bn) )
 *  --   => "galaxy", "star", "planet", "moon" or "comet"
 *  -- sein ( ship name or address number (int or bn) )
 *  --   => parent name or address number
 *
 */

var toAddress = function(name, unscramble) {
  if (!unscramble) {
    unscramble = true;
  };
  if (name.length == 3) {
    return getsuffixindex(name);
  } else if (name.length == 6) {
    var addr = getprefixindex(name.slice(0, 3));
    addr = addr * 256;
    addr = addr + getsuffixindex(name.slice(3, name.length));
    return addr;
  } else if (name.length == 13) {
    var addr = toAddress(name.slice(0, 6));
    addr = addr * 65536;
    addr = addr + toAddress(name.slice(7, addr.length));
    if (unscramble) {
      addr = fend(addr);
    };
    return addr;
  } else {
    return;
  }
};


//var toAddress = function(name) {
//    var nome = name.replace(/~|-/g, '');
//    var lent = nome.length;
//
//    if (lent % 3 != 0) {
//      return;
//    }
//
//    var syls = lent / 3;
//    if (syls > 1 && syls % 2 != 0) {
//      return;
//    }
//
//    if (syls == 1) {
//      return bn(wordtonum(nome))
//    } else if (syls >= 4 && syls <= 8) {
//      var padr = wordtonum(nome.slice(lent - 12, lent - 6));
//      padr = padr * 256
//      padr = padr + wordtonum(nome.slice(lent - 6, lent));
//      padr = fend(padr);
//
//      if (syls == 4) {
//        return padr;
//      };
//
//      var addr = 0;
//      for (var i = 0; i <= syls - 6; i += 2) {
//        addr = addr + wordtonum(nome.slice(i * 3, i * 3 + 6));
//        addr = addr * 0x10000;
//      };
//      return (addr * 0x10000) + padr;
//    } else {
//      var addr = 0;
//
//      for (var i = 0; i <= syls - 2; i +=2) {
//        addr = addr * 0x10000;
//        addr = addr + wordtonum(nome.slice(i * 3, i * 3 + 6));
//      };
//      return addr;
//    }
//
//}

var toGalaxyName = function(galaxy) {
  return toShipName(galaxy, 1);
};

var toStarName = function(star) {
  return toShipName(star, 2);
};

// better ES6 better way to do this
var toPlanetName = function(scrambled, scramble) {
  if (!scramble) {
    scramble = true;
  }
  return toShipName(scrambled, 4, scramble);
};

var toShipName = function(addr, minBytes, scramble) {
  if (!scramble) {
    scramble = true;
  };

  if (!minBytes) {
    if (addr < 0x100) {
      minBytes = 1;
    } else if (addr < 0x10000) {
      minBytes = 2;
    } else {
      minBytes = 4;
    }
  }

  if (minBytes == 4 && scramble) {
    addr = feen(addr);
  };

  var name = ""
  for (var i = 0; i < minBytes; i ++) {
    var byt = Math.floor(addr % 256);
    console.log('byt', byt);
    var syllable = "";
    if (i % 2 == 1) {
      syllable = getprefix(byt);
    } else {
      syllable = getsuffix(byt);
    }
    if (i == 2) {
      name = "-" + name
    };
    name = syllable + name;
    addr = addr / 256;
  };
  return name;
};

module.exports = {
  toAddress: toAddress,
  toGalaxyName: toGalaxyName,
  toStarName: toStarName,
  toPlanetName: toPlanetName,
  _wordtonum: wordtonum,
  _getsuffix: getsuffix,
  _muk: muk,
  _feen: feen,
  _fend: fend,
  _teil: teil
};
