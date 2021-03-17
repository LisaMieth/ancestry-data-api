const express = require('express')
const bodyParser = require('body-parser')
// const cors = require('cors')
// const helmet = require('helmet')
// const compression = require('compression')
// const rateLimit = require('express-rate-limit')
// const { body, check } = require('express-validator')

const { Pool } = require('pg')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
// app.use(cors())
// app.use(compression())
// app.use(helmet())

app.get('/', (req, res) => {
  res.status(200)
  res.json({ message: 'Ancestry data API.' })
})

// Get all (?) data points
app.get('/all', async (req, res) => {
  const connectionString = {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  }

  const pool = new Pool(connectionString);
  const client = await pool.connect();
  console.log('Connected');
  const result = await client.query('SELECT COUNT(*) FROM ancestry_dataset;')
  
  res.status(200).send(result)
})

app.listen(port, () => {
  console.log(`Started on port ${port}`)
})

module.exports = { app }
