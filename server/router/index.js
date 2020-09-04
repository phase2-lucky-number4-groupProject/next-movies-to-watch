const route = require('express').Router()
const UserController = require('../controllers/UserController')

route.post('/', UserController.register)
route.post('/users/register', UserController.register)
route.post('/users/login', UserController.login)
route.post('/users/googleSign', UserController.googleSign)

module.exports = route