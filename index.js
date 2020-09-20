const express = require('express');
const cors = require('cors')
const searchCoordinatesRouter = require('./controllers/searchByCoordinates')
const autoSearchPredictionsRouter = require('./controllers/autoSearchPredictions')
const textSearchRouter = require('./controllers/textSearch')

const app = express()

app.use(cors())
app.use(express.json())


//Routes
app.use('/api/searchByCoordinates', searchCoordinatesRouter)
app.use('/api/autoSearchPredictions', autoSearchPredictionsRouter)
app.use('/api/textSearch', textSearchRouter)

let PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})