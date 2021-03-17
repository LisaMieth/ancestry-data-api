const { Client } = require('pg')
const dotenv = require('dotenv')

dotenv.config()

const isProduction = process.env.NODE_ENV === 'production'
const sslSettings = isProduction ? { rejectUnauthorized: false } : false

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: sslSettings,
})

module.exports.client = client
