var express           = require('express'),
    app               = express(),
    bodyParser        = require('body-parser'),
    mongoose          = require('mongoose'),
    genresController  = require('./server/controllers/genres-controller');

mongoose.connect('mongodb://localhost:27017/subgenre');

app.listen(3000, function(){
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