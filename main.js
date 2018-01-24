var express = require('express');
var axios = require('axios');
var multer = require('multer');
var fileValidation = true;

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, req.body.studentnumber + "_timetable"+".png")
    }
});

var app = express();
var upload = multer({
  storage: storage,
  fileFilter: function(req, file, cb){
    if(file.mimetype !== 'image/png' && file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== ""){
      fileValidation = false;
      return cb(null, false);
    }
      cb(null, true);
    },
  limits: {filesize: 1024 * 1024}
});

const mongoose = require('mongoose');
mongoose.connect('mongodb://jhy5317:mobile5317@ds123896.mlab.com:23896/2018miro', {useMongoClient: true}, function(req, res){
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
  res.render('info.ejs', {applyCheck:false, checkResult:false, wrongFile:false, checking:false});
});

app.get('/checkingApply', function(req, res){
  res.render('checkingApply.ejs')
});

app.post('/check', function(req, res){
  Apply.find({studentnumber: req.body.studentnumber}, function(err, result){
    if(err) throw err;
    if(result.length > 0){
      res.json({success: true,
                name: result[0].name,
                major: result[0].major,
                studentnumber: req.body.studentnumber,
                grade: result[0].grade,
                phonenumber: result[0].phonenumber,
              });
    } else{
      res.json({success: false});
    }
  });
});

app.post('/applyMiro', upload.single('timetable'), function(req, res){
  console.log(req.body);
  if(req.body.checking !== "확인"){
    res.render('info.ejs',{applyCheck:false, checkResult:false, wrongFile:false, checking:true})
  } else {
    if(fileValidation !== false){
      const apply = new Apply({
        name: req.body.name,
        major: req.body.major,
        studentnumber: req.body.studentnumber.toString(),
        grade: req.body.grade,
        motive: req.body.motive,
        phonenumber: "010"+req.body.phonenumber.toString()
      });
      Apply.find({studentnumber: req.body.studentnumber}, function(err, result){
        if(err) {
          throw err;
        } else {
          if(result.length > 0){
            res.render('info.ejs', {applyCheck:true, checkResult:false, wrongFile:false, checking:false})
          } else{
            apply.save(function(err){
              if(err) throw err;
              res.redirect('/');
            })
          }
        }
      })
    }else{
      res.render('info.ejs',{applyCheck:false, checkResult:false, wrongFile:true, checking:false});
    }
  }
});

app.post('/closeWin', function(rea, res){
  res.write('<script>window.close()</script>')
})

app.get('/ggg', function(req, res){
  res.redirect('ggg.html')
})

app.get('/location', function(req, res){
  res.redirect('contact.html')
})

app.listen(3000, function(req, res){
  console.log('Server is Working.')
});
