const express = require('express');
const cors = require('cors');


const app = express();
const handleWeather = require('./components/weather');
const handleMovie = require('./components/movies');
const PORT = process.env.PORT || 3030;
app.use(cors());

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.get('/movie', handleMovie);

app.get('/weather', handleWeather);




app.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});
