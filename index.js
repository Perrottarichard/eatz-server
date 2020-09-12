require('dotenv').config();
const express = require('express');
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'build')))

app.get('/api', (req, res) => {
  res.send('<h1>Welcome to the backend!</h1>')
})

let PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})