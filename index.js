require('dotenv').config()

const app = require('./api')

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`\n=== server is running on port ${PORT} ===\n`)
})
