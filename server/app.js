require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const errHandler = require('./middlewares/errHandler');
const router = require('./router/index')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
app.use(router)
app.use(errHandler)

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})