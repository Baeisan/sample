var express = require('express');
var axios = require('axios');

var app = express();

var session = require('express-session');
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: '201712131633',
  resave: false,
  saveUninitialized: true,
}));

var mongoose = require('mongoose');
mongoose.connect('mongodb://jhy5317:mobile5317@ds123896.mlab.com:23896/2018miro');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected!');
});

var static = require('serve-static');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/img'));

var ejs = require('ejs');
app.set('views', __dirname + '/public');
app.set('view engine', 'ejs');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const Apply = require('./models/apply');

app.get('/', function(req, res){
  res.render('info.ejs',{boolean:false});
});

app.get('/checkingApply', function(req, res){
  res.render('checkingApply.ejs');
});

app.post('/applyMiro', function(req, res){
  const apply = new Apply({
    name: req.body.name,
    major: req.body.major,
    studentnumber: req.body.studentnumber,
    grade: req.body.grade,
    motive: req.body.motive,
    phonenumber: "0" + req.body.phonenumber
  });

  Apply.find({studentnumber: req.body.studentnumber}, function(err, result){
    if(err) throw err;
      if(result.length > 0){
      //검색결과 존재
          res.render('info.ejs',{boolean: true});
      } else{
        apply.save(function(err){
          if(err) throw err;
        });
        res.redirect('/');
      }
  });
});

app.listen(3000, function(req, res){
  console.log('Server is Working.')
});
