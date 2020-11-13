const express = require('express')
const cors = require('cors');
const dbConnect = require('./config/db')
const bodyParser = require('body-parser')

const app = express()
app.use(cors());
dbConnect()

const port = process.env.PORT || 4000
app.use(bodyParser.json({limit: '50mb'}))

app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/articles', require('./routes/articles'))

app.listen(port, '0.0.0.0', () => {
   console.log(`** Server is running on port ${port } **`)
})