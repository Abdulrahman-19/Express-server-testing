const express = require('express');
const cors = require('cors');
const weather = require('./assets/weather.json')
const superagent = require('superagent');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3030;
const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;
const MOVIE_API_KEY= process.env.MOVIE_API_KEY;
app.use(cors());

app.get('/', function (req, res) {
  res.send('Hello World');
});
app.get('/movie', function (req, res) {
  console.log(req.query);
  const movieApi = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${req.query.query}`;
  superagent.get(movieApi).then(movieData => {
    const arrOfMovies = movieData.body.results.map(mov => new Movie(mov));
    res.send(arrOfMovies);
  })
});
app.get('/weather', (req, res) => {
  try {
    const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${req.query.lat}&lon=${req.query.lon}`;
    superagent.get(weatherBitUrl).then(weatherBitData => {
      const arrOfData = weatherBitData.body.data.map(data => new Weather(data));
      res.send(arrOfData);
      // res.send(data.body);
    }).catch(console.error);

  } catch (error) {
    const arrOfData = weather.data.map(data => new Weather(data));
    res.send(arrOfData);

  }
});

class Weather {
  constructor(data) {
    this.date = data.valid_date;
    this.description = data.weather.description;
  }
}
class Movie {
  constructor(data) {
    this.release_date = data.release_date;
    this.title= data.title;
    this.overview= data.overview;
  }
}

app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});
