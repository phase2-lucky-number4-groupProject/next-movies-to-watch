const route = require('express').Router()
const QuoteController = require('../controllers/ApiController')

route.get('/movieQuote', QuoteController.showRandomQuote)

module.exports = route