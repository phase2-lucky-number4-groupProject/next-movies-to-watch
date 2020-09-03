const axios = require('axios');

let movieList = []

class MovieController {

    static showMovies(req, res) {
        movieList = []
        let { genre } = req.params
        let idGen = 0

        switch (genre.toLowerCase()) {
            case 'action':
                idGen = 28
                break;
            case 'adventure':
                idGen = 12
                break;
            case 'animation':
                idGen = 16
                break;
            case 'comedy':
                idGen = 35
                break;
            case 'crime':
                idGen = 80
                break;
            case 'documentary':
                idGen = 99
                break;
            case 'drama':
                idGen = 18
                break;
            default:
                throw {msg: 'not found'}
                break;
        }
        axios.get('https://api.themoviedb.org/3/discover/movie', {
            params: {
                api_key: process.env.API_KEY_MOVIES,
                language: 'en-US',
                sort_by: 'primary_release_date.desc',
                include_adult: 'false',
                include_video: 'true',
                primary_release_year: '2000',
                with_genres: `${idGen}`, 
                page: '1'

            }
        })
            .then(function (response) {

                let movieValue = {
                    id: 0,
                    title: '',
                    image: '',
                    rating: 0,
                    description: '',
                    genre: 0
                }
                response.data.results.forEach(el => {
                    movieValue = {}
                    movieValue.id = el.id
                    movieValue.title = el.title
                    movieValue.image = el.poster_path ? `https://image.tmdb.org/t/p/w500/${el.poster_path}` : 'https://free2music.com/template/img/none-img.png'
                    movieValue.rating = el.popularity
                    movieValue.description = el.overview ? el.overview : 'none'
                    movieValue.genre = el.genre_ids[0]

                    movieList.push(movieValue)

                });
                res.status(200).json({movieList})
            })
            .catch(function (error) {
                res.status(500).json({ error })
            })
    }



    static searchMovies(req,res){
        movieList = []
        let { genre } = req.body

        let idGen = 0

        switch (genre.toLowerCase()) {
            case 'action':
                idGen = 28
                break;
            case 'adventure':
                idGen = 12
                break;
            case 'animation':
                idGen = 16
                break;
            case 'comedy':
                idGen = 35
                break;
            case 'crime':
                idGen = 80
                break;
            case 'documentary':
                idGen = 99
                break;
            case 'drama':
                idGen = 18
                break;
            default:
                throw {msg: 'not found'}
                break;
        }

        axios.get('https://api.themoviedb.org/3/discover/movie', {
            params: {
                api_key: process.env.API_KEY_MOVIES,
                language: 'en-US',
                sort_by: 'primary_release_date.desc',
                include_adult: 'false',
                include_video: 'true',
                primary_release_year: '2020',
                with_genres: `${idGen}`,
                page: '1'

            }
        })
            .then(function (response) {
                let movieValue = {
                    id: 0,
                    title: '',
                    image: '',
                    rating: 0,
                    description: '',
                    genre: 0
                }
                response.data.results.forEach(el => {
                    movieValue = {}
                    movieValue.id = el.id
                    movieValue.title = el.title
                    movieValue.image = el.poster_path ? `https://image.tmdb.org/t/p/w500/${el.poster_path}` : 'https://free2music.com/template/img/none-img.png'
                    movieValue.rating = el.popularity
                    movieValue.description = el.overview ? el.overview : 'none'
                    movieValue.genre = el.genre_ids[0]

                    movieList.push(movieValue)

                });
                res.status(200).json({movieList})
            })
            .catch(function (error) {
                res.status(500).json({ error })
            })
    }
}

module.exports = MovieController