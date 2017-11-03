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
  console.log('get suffix', i);
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
  if (pyn >= 0x10000 && pyn <= 0xFFFFFFFF) {
    return 0x10000 + nice(pyn - 0x10000);
  }
  if (pyn >= 0x100000000 && pyn <= bn("18446744073709552000")) {
    var lo = pyn & 0xFFFFFFFF;
    var hi = pyn & bn("18446744073709552000");
    return hi | feen(lo);
  }
  return pyn;
}

var fend = function(cry) {
  if (cry >= 0x10000 && cry <= 0xFFFFFFFF) {
    return 0x10000 + teil(cry - 0x10000);
  };
  if (cry >= 0x100000000 && cry <= bn(18446744073709552000)) {
    var lo = cry & 0xFFFFFFFF;
    var hi = cry & bn(18446744073709552000);
    return hi | fend(lo);
  };
  return cry;
};

var fice = function(nor) {
  var sel = [
    nor % 0xFFFF,
    nor / 0x10000
  ];
  for (var i = 0; i < 3; i++) {
    sel = rynd(i, sel[0], sel[1]);
  };
  return 0xFFFF * sel[0] + sel[1];
};

var teil = function(vip) {
  var sel = [
    vip % 0xFFFF,
    vip / 0x10000
  ];
  // maybe the for loops got borked in lua conversion
  for (var i = 3; i > 0; i--) {
    sel = rund(i, sel[0], sel[1]);
  };
  return 0xFFFF * sel[0] + sel[1]
};

var rynd = function(n, l, r) {
  var res = [r, 0];
  var m = 0x10000;
  if (n % 2 == 0) {
    m = 0xFFFF;
  };
  res[1] = (1 + muk(raku[n], r)) % m;
  return res;
};

var rund = function(n, l, r) {
  var res = [r, 0];
  var m = 0x10000;
  if (n % 2 == 0) {
    m = 0xFFFF;
  };
  var h = muk(raku[n], r);
  res[1] = (m + 1 - (h % m)) % m;
  return res
};

var muk = function(syd, key) {
  key = bn(key);
  var lo = key & 0xFF;
  var hi = (key & 0xFF00) / 0x100;
  return murmur3(String.fromCharCode(lo) + String.fromCharCode(hi), syd);
};

var murmur3 = function(data, seed) {
  seed = seed ? seed : 0;
  seed = bn(seed);
  var c1 = 3432918353;
  var c2 = 461845907;
  var length = data.length;
  var h1 = seed;
  var k1;
  var roundedEnd = length & 0xFFFFFFFC;
  // maybe the for loops got borked in lua conversion
  for (var i = 0; i < roundedEnd - 1; i += 4) {
    var x = data.charAt(i + 3) ? data.charAt(i + 3) : 0;
    k1 = bn(data.charAt(i) & 0xFF)
      | ((data.charAt(i + 1) & 0xFF) << 8)
      | ((data.charAt(i + 2) & 0xFF) << 16)
      | (x << 24);
    k1 = k1 * c1;
    k1 = (k1 << 15) | ((k1 & 0xFFFFFFFF) >> 17);
    k1 = k1 * c2;
    h1 = h1 ^ k1;
    h1 = (h1 << 13) | ((h1 & 0xFFFFFFFF) >> 19);
    h1 = h1 * 5 + 3864292196;
  };
  k1 = 0;
  var val = length & 3;
  if (val == 3) {
    k1 = bn(data.charAt(roundedEnd + 2) & 0xFF) << 16;
  };
  if (val == 3 || val == 2) {
    k1 = k1 | (bn(data.charAt(roundedEnd + 1) & 0xFF) << 8);
  };
  if (val == 3 || val == 2 || val == 1) {
    k1 = k1 | (data.charAt(roundedEnd) & 0xFF);
    k1 = k1 * c1;
    k1 = (k1 << 15) | ((k1 & 0xFFFFFFFF) >> 17);
    k1 = k1 * c2;
    h1 = h1 ^ k1;
  };
  h1 = h1 ^ length;
  h1 = h1 ^ ((h1 & 0xFFFFFFFF) >> 16);
  h1 = h1 * 2246822507;
  h1 = h1 ^ ((h1 & 0xFFFFFFFF) >> 13);
  h1 = h1 * 3266489909;
  h1 = h1 ^ ((h1 & 0xFFFFFFFF) >> 16);
  return h1 & 0xFFFFFFFF
};

/*
 * Public methods
 *  -- nume ( ship name )
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

var nume = function(name) {
    var nome = name.replace(/~|-/g, '');
    var lent = nome.length;

    if (lent % 3 != 0) {
      return;
    }

    var syls = lent / 3;
    if (syls > 1 && syls % 2 != 0) {
      return;
    }

    if (syls == 1) {
      return bn(wordtonum(nome))
    } else if (syls >= 4 && syls <= 8) {
      var padr = wordtonum(nome.slice(lent - 12, lent - 6));
      padr = padr * 0x10000;
      padr = padr + wordtonum(nome.slice(lent - 6, lent));
      padr = fend(padr);

      if (syls == 4) {
        return padr;
      };

      var addr = 0;
      for (var i = 0; i <= syls - 6; i += 2) {
        addr = addr + wordtonum(nome.slice(i * 3, i * 3 + 6));
        addr = addr * 0x10000;
      };
      return (addr * 0x10000) + padr;
    } else {
      var addr = 0;

      for (var i = 0; i <= syls - 2; i +=2) {
        addr = addr * 0x10000;
        addr = addr + wordtonum(nome.slice(i * 3, i * 3 + 6));
      };
      return addr;
    }

}

var nome = function(addr) {
  addr = bn(addr);
  var bytes = addr.bitLength();
  //console.log('bytes', bytes);
  // make sure byte-length is even
  if (bytes > 1 && bytes % 2 == 1) {
    bytes = bytes + 1;
  };
  console.log('bytes', bytes);
  var name = "";
  //unscramble planet/moon
  //wont this catch galaxies?
  if (bytes >= 4 && bytes <= 8) {
    console.log('planet or moon');
    var padr = (addr % 0x100000000);
    console.log('padr', padr);
    var nadr = feen(padr);
    console.log('padr', nadr);
    addr = addr - padr + nadr;
    console.log('addr', addr);
  }
  // for loops 
  for (var i = 0; i < bytes - 1; i++) {
    //console.log('loop triggered');
    console.log('loop iter', i);
    var byt = bn((addr % 0x100)).toNumber();
    console.log('byt', byt);
    var syllable = "";
    if (i % 2 == 1) {
      syllable = getprefix(byt);
    } else {
      syllable = getsuffix(byt);
    }
    if (i > 0 && i % 2 == 0) {
      name = "-" + name;
    };
    if (i > 0 && i % 8 == 0) {
      name = "-" + name;
    };
    console.log('syllable', syllable);
    name = syllable + name;
    addr = addr / 0x100;
  };
  return name;
};

module.exports = {
  nume: nume,
  nome: nome,
  _wordtonum: wordtonum,
  _getsuffix: getsuffix,
  _fend: fend,
  _teil: teil
};
