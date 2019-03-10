/*var mongoose = require('mongoose');
var mongo = require('mongodb');
var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors');
//require('./server');
var app = express();

//mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true})
//console.log(mongoose.connection.readyState);
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true})
//console.log(mongoose.connection.readyState);
app.use(cors());

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
var Schema = mongoose.Schema;

var urlSchema = new Schema({
   originalUrl: String,
   shortUrl: String
});

const Link = mongoose.model("Link",urlSchema)

//para cambiar val
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// POST /login gets urlencoded bodies
app.post('/api/hello', urlencodedParser, function (req, res) {
  res.send({ur:req.body,nueva:"dd"})
})

module.exports = app;
module.exports = Link;*/