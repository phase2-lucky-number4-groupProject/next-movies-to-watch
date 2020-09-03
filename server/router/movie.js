const route = require('express').Router()
const MovieController = require('../controllers/MovieController')

route.get('/', MovieController.showMovies)

module.exports = route