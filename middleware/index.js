const redis = require('redis')

const Key = require('../models/Key') // will use the key db to validate key before kicking into count
const client = require('../redis')

module.exports = (req, res, next) => {
  const { key } = req.headers

  return client.get(key, (_err, calls) => {
    if (calls) {
      if (calls < 10) {
        req.key = key
        next()
      } else {
        client.set(key, calls)
        return res.status(403).json({ message: `${key} has exceeded 10 calls` })
      }
    } else {
      client.set(key, 0)
      req.key = key
      next()
    }
  })
}
