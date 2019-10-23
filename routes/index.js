const router = require('express').Router()

const Key = require('../models/Key')
const client = require('../redis')
const gandalf = require('../middleware')

router.get('/', gandalf, (req, res) => {
  const keyValue = req.key
  let newCalls

  return client.get(keyValue, (_err, calls) => {
    /*=== increments call count by 1 ===*/
    newCalls = Number(calls) + 1

    /*=== stores incremented value in redis store ===*/
    client.set(keyValue, newCalls)

    /*=== returns call value for demo purpose ===*/
    return res.json({ calls: newCalls })
  })
})

/*=== testing posting to mongodb instance ===*/
router.post('/', async (req, res) => {
  const { key } = req.body
  const newKey = new Key({ key })

  try {
    const savedKey = await newKey.save()
    res.status(201).json(savedKey)
  } catch (err) {
    res.status(400).json(err)
  }
})

module.exports = router
