const route = require('express').Router()
const QuoteController = require('../controllers/ApiController')

route.get('/', QuoteController.showRandomQuote)

module.exports = route