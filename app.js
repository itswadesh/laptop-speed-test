const express = require('express')
const os = require('os')
const colors = require('colors')
const app = express()
const port = 9999

var responseTime = require('response-time')

app.use(responseTime())
async function longRunningComputation() {
  let time = new Date()
  let i = 0
  for (i = 0; i < 100000000; i++) {
    i++
  }
  return new Date().getTime() - time.getTime()
}

app.get('/', async (req, res) => {
  await longRunningComputation()
  res.send('Hello World!')
})

app.listen(port, async () => {
  console.log(`Example app listening on port ${port}`)
  const computationTime = await longRunningComputation()
  const serverParams = `CPU Cores: ${colors.yellow(
    //@ts-ignore
    os.cpus().length
  )} - Server Response: ${colors.red(
    //@ts-ignore
    computationTime
    //@ts-ignore
  )} ms, expected ${colors.green(25)} ms`

  console.log(serverParams)
})
