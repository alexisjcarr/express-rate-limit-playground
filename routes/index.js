const router = require('express').Router()

const Key = require('../models/Key')
const client = require('../redis')
const gandalf = require('../middleware')

router.get('/', gandalf, (req, res) => {
  const keyValue = req.key
  return client.get(keyValue, (_err, calls) => {
    if (calls) {
      // increments call count by 1
      let newCalls = Number(calls) + 1

      // stores incremented value in redis store
      client.set(keyValue, newCalls)

      // returns call value for demo purpose
      return res.json({ calls: newCalls })
    } else {
      // if no call in store yet, sets it to 1 for first call
      client.set(keyValue, 1)
      return res.json({ calls: newCalls })
    }
  })
})

router.post('/', async (req, res) => {
  const { apiKey } = req.body
  const key = new Key({ key: apiKey })

  try {
    const savedKey = await key.save()
    res.status(201).json(savedKey)
  } catch (err) {
    res.status(400).json(err)
  }
})

module.exports = router
