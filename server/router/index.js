const route = require('express').Router()
const movieRoute = require('./movie')
const userRoute = require('./user')
const apiRoute = require('./api')

route.use('/', userRoute)
route.use('/movies', movieRoute)
route.use('/api', apiRoute)

module.exports = route