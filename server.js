'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
var cors = require('cors');
var ap = require('./app')
var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 


mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true})
app.use(cors());
console.log(mongoose.connection.readyState);
/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  
// your first API endpoint... 
/*app.get("/api/:hello", function (req, res) {
  var val = req.params.hello
  res.json({greeting: val});
});*/


/*app.use(bodyParser.urlencoded({extended:false}))
app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
})*/

/*
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// POST /login gets urlencoded bodies
app.post('/api/shorturl/new', urlencodedParser, function (req, res) {
  res.send({ur:req.body,nueva:"dd"})
})

// POST /api/users gets JSON bodies
app.post('/api/shorturl/new', jsonParser, function (req, res) {
  // create user in req.body
})*/

var Schema = mongoose.Schema;

var urlSchema = new Schema({
   originalUrl: String,
   shortUrl: String
});

var Link = mongoose.model("urls",urlSchema) //revisar si no usa link o urls



var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// POST /login gets urlencoded bodies
app.post('/api/shorturl/new', urlencodedParser, function (req, res,next) {
  
  var urlToShorten = req.body.url;
  
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = expression;
  if(regex.test(urlToShorten)===true){
    
    Link.findOne({originalUrl:urlToShorten},(err,inf) => {
      if(inf) {
        res.send({
          originalUrl: urlToShorten,
          shortUrl: inf.shortUrl
        
        });
     
      } else {
      
      var short = Math.floor(Math.random()*150000).toString();
    
    var data = new Link({
        originalUrl: urlToShorten,
        shortUrl: short
    })
    
    data.save((err) =>{
      if(err){
        return res.send("Error al grabar en base de datos")
      }
    
    })
     return res.json(data)
      
      
      }
        
    });
       
    
  } else { //revisar si solo se requiere mostrar y no crear en base a modelo
    var data = new Link({
        originalUrl: "Valor no tiene formato requerido",
        shortUrl: "No valido"
    })
     return res.json(data)
  }
  
});

app.get("/api/shorturl/:new", function (req,res,next){
    var shorterUrl = req.params.new
    
    Link.findOne({shortUrl:shorterUrl},function(err,data){
      if(err) return res.send("Error al leer la base de datos")           
      var re = new RegExp("^(http|https)://","i");
      var strCheck = data.originalUrl;
      if(re.test(strCheck)){
          res.redirect(301,data.originalUrl);
      } else {
          res.redirect(301, "http://" + data.originalUrl);
      }
      
    });
});




app.listen(port, function () {
  console.log('Node.js listening ...');
});

module.exports = Link;