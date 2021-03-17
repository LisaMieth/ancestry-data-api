const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const rateLimit = require('express-rate-limit')
const { client } = require('./db_config')

const app = express()
const port = process.env.PORT || 5000
const isProduction = process.env.NODE_ENV === 'production'

const origin = {
  origin: isProduction ? '*.herokuapp.com' : '*',
}
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 10,
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors(origin))
app.use(compression())
app.use(helmet())
app.use(limiter)

app.get('/', (req, res) => {
  res.status(200)
  res.json({ message: 'Ancestry data API.' })
})

// Get all (?) data points
app.get('/all', async (req, res) => {
  await client.connect()
  const result = await client.query('SELECT first_name, last_name, last_name_normed, latitude, longitude FROM ancestry_dataset;')
  res.status(200).send(result.rows)
})

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Started on port ${port}`)
})

module.exports = { app }
