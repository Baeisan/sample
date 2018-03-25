var express = require('express');
var axios = require('axios');
var multer = require('multer');
var fileValidation = true;


var app = express();


const mongoose = require('mongoose');
mongoose.connect('자기디비채워넣', {useMongoClient: true}, function(req, res){
  console.log('We are Connected!')
});
mongoose.Promise = global.Promise;

var static = require('serve-static');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/src'));

var ejs = require('ejs');
app.set('views', __dirname + '/public');
app.set('view engine', 'ejs');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const Apply = require('./models/apply');

app.get('/', function(req, res){
  res.render('info.ejs');
});



app.get('/ggg', function(req, res){
  res.redirect('ggg.html')
})

app.get('/location', function(req, res){
  res.redirect('contact.html')
})

app.listen(3000, function(req, res){
  console.log('Server is Working.')
});
