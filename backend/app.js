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

var apiFunction = function (req, res) {
  setTimeout(() => res.send(new Date()), 1000);
}

//here is the magic
app.use(cors(corsOptions));

app.get('/first', apiFunction);

app.get('/second', apiFunction);

app.get('/third', apiFunction);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
