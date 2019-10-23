require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const apiKeyRoute = require('./routes')

const app = express()

app.use(express.json())

app.use('/api', apiKeyRoute)

app.get('/', (_req, res) => {
  res.send('Redis fun 🤓')
})

mongoose.connect(
  process.env.MONGO_DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log(`\n=== connected to mongo db instance ===\n`)
)

app.listen(5000, () => {
  console.log(`\n=== server is running on port 5000 ===\n`)
})
