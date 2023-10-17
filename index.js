const express = require('express')
const cors = require('cors')
const app = express()
const port =process.env.PORT || 5000


// Middlewire
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Brand-Shop Server is Running...')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})