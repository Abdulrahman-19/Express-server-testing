
const { response } = require('express');
const superagent = require('superagent');
require('dotenv').config();
const MOVIE_API_KEY= process.env.MOVIE_API_KEY;

const inCache = {};
const movieHandler = function (req, res) {
  console.log(req.query);
  const movieApi = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${req.query.query}`;
  superagent.get(movieApi).then(movieData => {
    if (inCache[req.query.query] !== undefined){
      console.log('from cache');
      res.send(inCache[req.query.query]);
    }else{
      console.log('from API');
      const arrOfMovies = movieData.body.results.map(mov => new Movie(mov));
      console.log('storing in Cache');
      inCache[req.query.query]= arrOfMovies;
      res.send(arrOfMovies);
    }
  })
}

class Movie {
  constructor(data) {
    this.release_date = data.release_date;
    this.title= data.title;
    this.overview= data.overview;
  }
}

module.exports = movieHandler;
