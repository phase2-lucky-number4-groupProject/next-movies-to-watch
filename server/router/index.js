const route = require('express').Router()
const movieRoute = require('./movie')
const userRoute = require('./user')
const apiRoute = require('./api')
const weatherRoute = require('./weather')

route.use('/', userRoute)
route.use('/movies', movieRoute)
route.use('/quote', apiRoute)
route.use('/weather', weatherRoute)

module.exports = route