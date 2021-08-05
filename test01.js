//libraries
var { Pool } = require('pg')
const config = require('config')

//config parameters
const dbName = config.get('postgis.dbname')
const pgHost = config.get('postgis.host')
const pgPort = config.get('postgis.port')
const dbUser = config.get('postgis.dbUser')
const dbPassword = config.get('postgis.dbPassword')



var pool = new Pool({
   user: dbUser,
   host: pgHost,
   database: dbName,
   password: dbPassword,
   port: pgPort
})

pool.connect(async (err, client, release) => {
  if (err) {
  return console.error('Error acquiring client', err.stack)
  }
  let sql = 'SELECT * FROM unhq_popp LIMIT 3'
  let result = await client.query(sql, (err, result) => {
          release()
  if (err) {
   return console.error('Error executing query', err.stack)
  }
  console.log(JSON.stringify(result.rows))
  })
})