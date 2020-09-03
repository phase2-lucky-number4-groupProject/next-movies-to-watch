require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())


const router = require('./router')
app.use('/', router)


app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
})