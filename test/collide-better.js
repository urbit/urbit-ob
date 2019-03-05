const BN = require('bn.js')
const Database = require('better-sqlite3')
const fs = require('fs')
const ob = require('../src')

let db = new Database('patp.db', { memory: false })

let lower = Math.pow(2, 16)
let upper = lower + 1000001 // Math.pow(2, 32) - 1

let create = db.prepare("CREATE TABLE patp (number INTEGER PRIMARY KEY, patp TEXT)")

create.run()

let insert = db.prepare("INSERT INTO patp(number, patp) VALUES (?, ?)")

let counter = 1

for (j = lower; j < upper + 1001; j += 1000) {
  db.transaction(_ => {
    for (i = j; i < j + 1000; i++) {
      if (counter % 10000000 === 0) { console.log(`passed ${counter} planets`) }
      insert.run(i, ob.vatp(i))
      counter++
    }
  })()
}

let dups = db.prepare("SELECT * from patp where patp in (select patp from patp group by patp having count(*) > 1)")

let res = dups.all()

fs.writeFileSync("./test-duplicates.json", JSON.stringify(res))

db.close()

