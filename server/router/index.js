const route = require('express').Router()
const UserController = require('../controllers/UserController')
const authentication = require('../middlewares/authentication')
const movieRoute = require('./movie')
const apiRoute = require('./api')
const weatherRoute = require('./weather')

route.post('/', UserController.register)
route.post('/users/register', UserController.register)
route.post('/users/login', UserController.login)
route.post('/users/googleSign', UserController.googleSign)

route.use(authentication)
route.use('/movies', movieRoute)
route.use('/quote', apiRoute)
route.use('/weather', weatherRoute)

module.exports = route