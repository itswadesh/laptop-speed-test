const express = require('express')
const app = express()
const port = 9999

var responseTime = require('response-time')

app.use(responseTime())

async function longRunningComputation() {
  let i = 0
  for (i = 0; i < 1000000000; i++) {
    i++
  }
  return i
}

app.get('/', async (req, res) => {
  await longRunningComputation()
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
