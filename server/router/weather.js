const router = require('express').Router();
const WeatherController = require('../controllers/WeatherController.js');

router.get('/', WeatherController.show);


module.exports = router;