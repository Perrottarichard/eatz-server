const express = require('express');
const cors = require('cors')
const searchCoordinatesRouter = require('./controllers/searchByCoordinates')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/searchByCoordinates', searchCoordinatesRouter)

let PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})