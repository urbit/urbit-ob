
const BN = require('bn.js')
const sqlite3 = require('sqlite3')
const fs = require('fs')

const ob = require('../src')

let db = new sqlite3.Database(':memory:')

let lower = Math.pow(2, 16)
let upper = lower + 1000001 // Math.pow(2, 32) - 1

db.serialize(function() {
  db.run("CREATE TABLE patp (number INT, patp TEXT)")

  db.parallelize(function() {
    let stmt = db.prepare("INSERT INTO patp(number, patp) VALUES (?, ?)")

    for (j = lower; j < upper; j++) {
      stmt.run(j, ob.vatp(j))
    }
    stmt.finalize()

  })

  let dups = db.prepare("SELECT * from patp where patp in (select patp from patp group by patp having count(*) > 1)")

  dups.all([], function(err, rows) {
    if (err) { console.log(err) }
    fs.writeFileSync("./test-duplicates.json", JSON.stringify(rows))
  })

  dups.finalize()

})

db.close()

