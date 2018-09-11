var express = require('express');
var cors = require('cors');
var app = express();

var originsWhitelist = [
  'http://localhost:8080'
];

var corsOptions = {
  origin: function(origin, callback){
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
  }
  //,credentials:true
}

//here is the magic
app.use(cors(corsOptions));

app.get('/first', function (req, res) {
  res.send(new Date());
});

app.get('/second', function (req, res) {
  res.send(new Date());
});

app.get('/third', function (req, res) {
  res.send(new Date());
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
