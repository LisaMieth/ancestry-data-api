const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
// const helmet = require('helmet')
// const compression = require('compression')
// const rateLimit = require('express-rate-limit')
// const { body, check } = require('express-validator')
const { client } = require('./db_config')

const app = express()
const port = process.env.PORT || 5000

const origin = {
  origin: process.env.ORIGIN || '*',
}

console.log(origin);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors(origin))
// app.use(compression())
// app.use(helmet())

app.get('/', (req, res) => {
  res.status(200)
  res.json({ message: 'Ancestry data API.' })
})

// Get all (?) data points
app.get('/all', async (req, res) => {
  await client.connect()
  const result = await client.query('SELECT first_name, last_name FROM ancestry_dataset;')
  res.status(200).send(result.rows)
})

app.listen(port, () => {
  console.log(`Started on port ${port}`)
})

module.exports = { app }
