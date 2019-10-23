const { Schema, model } = require('mongoose')

const KeySchema = Schema({
  key: {
    type: String,
    required: true
  }
})

module.exports = model('keys', KeySchema)
