const axios = require('axios')
class ApiController {
    static async showRandomQuote(req, res, next) {
        // const endpoint = `https://quote-garden.herokuapp.com/api/v2/genre/movies?page=1&limit=20`
        const genre = 'movies'
        const endpoint = `https://quote-garden.herokuapp.com/api/v2/genre/${genre}`
        try {
            const response = await axios.get(endpoint, {
                params: {
                    page: 1, 
                    limit: 20
                }
            });
            let sortedQuotes = []
            let responseQuotes = response.data.quotes
            for (let i = 0; i < responseQuotes.length; i++) {
                let staging = {}
                staging.id = i+1
                staging.quote = responseQuotes[i].quoteText
                staging.author = responseQuotes[i].quoteAuthor
                sortedQuotes.push(staging);
            }
            // console.log(sortedQuotes);
            res.status(200).json({quotes: sortedQuotes});
        } catch (error) {
            next(error)
        }
    }
}

module.exports = ApiController