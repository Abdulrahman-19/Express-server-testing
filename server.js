const express = require('express');
const cors = require('cors');
const weather = require('./assets/weather.json')
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3030;
app.use(cors());

app.get('/', function (req, res) {
  res.send('Hello World');
});
app.get('/about', function (req, res) {
  res.send('World');
});
app.get('/weather', (req, res) => {
  const arrOfData = weather.data.map(data => new Weather(data));
  res.send(arrOfData);
});

class Weather {
  constructor(data){
    this.date = data.valid_date;
    this.description = data.weather.description;
  }
}

app.listen(PORT, ()=>{
  console.log(`server started on ${PORT}`);
});
