var express = require('express');
var path = require ('path');
var bodyParser = require('body-parser');

var songs = require('./data.json');

var app = express();

app.use(express.static('public'));
//static is a method in express
//enables us to serve static files

//covert any url encoded body into a JS object
// added to req.body
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', function (req, res){
  res.sendFile(path.join (__dirname, 'public/index.html'));
  //handling a get request.

});

app.get('/songs', function (req, res){
  res.send(songs);

});

app.post('/songs', function (req, res){
  console.log('req.body', req.body);
  if(req.body.title == '' || req.body.artist == '' || req.body.albums == '' || duplicateCheck(req.body)){
    res.sendStatus(400);
  }else{
    //puts object into the array (called songs)
    songs.push(req.body);
    res.sendStatus(200);
  }

})

function duplicateCheck(double){
  var duplicate;
  songs.forEach(function(song){
    if(song.title == double.title){
    duplicate = true;
    console.log(duplicate);
  }else{
    duplicate = false;
  }
  })
  return duplicate;
};

var date = Date.month();
req.body['datedAdded'] = date;

app.listen(3000);
