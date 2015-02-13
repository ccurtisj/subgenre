var express           = require('express'),
    app               = express(),
    bodyParser        = require('body-parser'),
    mongoose          = require('mongoose'),
    genresController  = require('./server/controllers/genres-controller');

// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.
var uristring =
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/subgenre';

// The http server will listen to an appropriate port, or default to
// port 5000.
var theport = process.env.PORT || 3000;

// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(uristring, function (err, res) {
  if (err) {
    console.log ('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + uristring);
  }
});

app.listen(theport, function(){
  console.log("I'm listening...");
})

// Middleware
app.use(bodyParser());
app.use('/js', express.static(__dirname + '/client/js'));
app.use('/css', express.static(__dirname + '/client/css'));

// Routes
app.get('/', function(req, res){
  res.sendFile(__dirname + '/client/views/index.html')
});

app.get('/api/genres', genresController.list)
app.post('/api/genres', genresController.create)