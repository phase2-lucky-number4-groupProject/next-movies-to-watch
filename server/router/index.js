const route = require('express').Router()
const movieRoute = require('./movie')
const userRoute = require('./user')

route.use('/', userRoute)
route.use('/movies', movieRoute)

module.exports = route