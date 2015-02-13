var express           = require('express'),
    app               = express(),
    bodyParser        = require('body-parser'),
    mongoose          = require('mongoose'),
    genresController  = require('./server/controllers/genres-controller');

mongoose.connect('mongodb://localhost:27017/subgenre');

app.listen(3000, function(){
  console.log("I'm listening...");
})

// Config
app.set('view engine', 'jade');

// Middleware
app.use(bodyParser());
app.use('/js', express.static(__dirname + '/client/js'));
app.use('/css', express.static(__dirname + '/client/css'));

// Routes
app.get('/', function(req, res){
  res.render('../server/views/index', { title: 'Hey', message: 'Hello there!'});
});

app.get('/api/genres', genresController.list)
app.post('/api/genres', genresController.create)