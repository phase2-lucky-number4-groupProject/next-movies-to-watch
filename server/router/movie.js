const route = require('express').Router()
const MovieController = require('../controllers/MovieController')

route.get('/', MovieController.allRandom)
route.get('/:genre', MovieController.showMovies)
route.post('/', MovieController.searchMovies)

module.exports = route