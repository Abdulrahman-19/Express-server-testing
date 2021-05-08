
const weather = require('../assets/weather.json');
const superagent = require('superagent');
require('dotenv').config();
const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;
const inMemory = {};

const weatherHandler = (req, res) => {
  try {
    const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_BIT_KEY}&lat=${req.query.lat}&lon=${req.query.lon}`;
    superagent.get(weatherBitUrl).then(weatherBitData => {
      if (inMemory[`${req.query.lat} ${req.query.lon}`]){
        console.log('from APIWeather')
        res.send(inMemory[`${req.query.lat} ${req.query.lon}`]);
      }else{

        const arrOfData = weatherBitData.body.data.map(data => new Weather(data));
        console.log('from cacheWeather');
        inMemory[`${req.query.lat} ${req.query.lon}`]= arrOfData;
        res.send(arrOfData);
        // res.send(data.body);
      }
    }).catch(console.error);
  
  } catch (error) {
    const arrOfData = weather.data.map(data => new Weather(data));
    res.send(arrOfData);
  
  }
}
class Weather {
  constructor(data) {
    this.date = data.valid_date;
    this.description = data.weather.description;
  }
}

module.exports = weatherHandler;
