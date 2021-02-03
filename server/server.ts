/* eslint-disable no-undef */
import axios from 'axios'
import express from 'express'
import path from 'path'

const app = express()
const apiAddress = 'https://bad-api-assignment.reaktor.com'


const buildPath = path.join(process.env.PWD,'../', 'build')

app.use(express.static(buildPath))

app.get('/v2/*', async (req, res) => {
  const apiPath = req.originalUrl
  const api = `${apiAddress}${apiPath}`
  try {
    const response =  await axios.get(api,{ headers: req.get('x-force-error-mode') })
    res.send(response.data)

  } catch(e){
    res.status(502).send(e.message)
  }
})

app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath,'index.html'))
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Proxy Server running on port ${PORT}`)
})