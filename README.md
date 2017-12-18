# ++  ob

js implementation of hoon.hoon arm `ob`

This library is responsible for converting urbit addresses from digits to `@p`, 
or the phonetic base, that Urbit uses for naming ships. Also works in reverse.

- `ob.toGalaxyName(0) -> ~zod`
- `ob.toPlanetName(9896704) -> ~poldec-tonteg`
- `ob.toAddress('~marzod') -> 256`

Make sure to `npm install` to install dependencies. Thanks to `keybase.io/aberg` 
and `@MDFang` for the following inspiration.

- https://github.com/asssaf/urbit-shipyard
- https://github.com/Fang-/urb.lua
