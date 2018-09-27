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

const webpush = require('web-push');

const publicVapidKey = 'BM7wU4W9tLBRKRVIz3eaORb9r2tDeVCjb-Ck9BCMQGYdGgzUywsCBt0zTtGEzgVpNCJvOJPC6IcvMxnHBi0mec4';
const privateVapidKey = 'ewjPYKD1z0kt4jrx2XI0gOMJlvQSgkw4ViaxJgbM5wc';

webpush.setVapidDetails('mailto:reto.rezzonico@2bit.ch', publicVapidKey, privateVapidKey);

app.use(require('body-parser').json());

app.post('/subscribe', (req, res) => {
  const subscription = req.body;
  res.status(201).json({});
  const payload = JSON.stringify({ notification: { title: 'test', message: 'this is a push', data: 'some data' }});

  console.log(subscription);

  webpush.sendNotification(subscription, payload).catch(error => {
    console.error(error.stack);
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
