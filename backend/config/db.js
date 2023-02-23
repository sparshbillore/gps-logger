const { Pool } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Pensieve',
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
})

module.exports = {
    query: (text, params) => pool.query(text, params)
}