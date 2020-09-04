const route = require('express').Router()
const UserController = require('../controllers/UserController')
const movieRoute = require('./movie')
const userRoute = require('./user')
const apiRoute = require('./api')

route.post('/', UserController.register)
route.post('/users/register', UserController.register)
route.post('/users/login', UserController.login)
route.post('/users/googleSign', UserController.googleSign)

route.use('/', userRoute)
route.use('/movies', movieRoute)
route.use('/api', apiRoute)

module.exports = route