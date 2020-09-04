'use strict'
const axios = require('axios');

class WeatherController {
    static show(req, res, next){   
        // res.send('ok')
        let url = 'http://api.openweathermap.org/data/2.5/weather?'
        axios.get(url, {
            params: {
                q: 'Jakarta',
                appid: process.env.WEATHER_API_ID
            }
        })
        .then(response => {
            //console.log(response.data)
            res.status(200).json({ weather: response.data })
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = WeatherController;