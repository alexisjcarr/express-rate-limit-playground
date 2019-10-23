const redis = require('redis')

const Key = require('../models/Key')
const client = require('../redis')

module.exports = (req, res, next) => {
  const { key } = req.headers

  return client.get(key, (_err, calls) => {
    if (calls < 10) {
      req.key = key
      next()
    } else {
      return res.status(403).json({ message: `${key} has exceeded 10 calls` })
    }
  })
}
