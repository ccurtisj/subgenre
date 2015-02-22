var express           = require('express'),
    app               = express(),
    bodyParser        = require('body-parser'),
    session           = require('express-session'),
    mongoose          = require('mongoose'),
    genresController       = require('./api/controllers/genres-controller'),
    definitionsController  = require('./api/controllers/definitions-controller');

var passport        = require('passport'),
    TwitterStrategy = require('passport-twitter').Strategy,
    User            = require('./api/models/user');

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

// Config
app.set('view engine', 'jade');

// Middleware
app.use(bodyParser());
app.use('/js', express.static(__dirname + '/client/js'));
app.use('/css', express.static(__dirname + '/client/css'));
app.use('/images', express.static(__dirname + '/client/images'));

// Auth
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new TwitterStrategy({
    consumerKey: 'TXVvRjV0NhXEnXXtMjRpMSNfj',// TWITTER_CONSUMER_KEY,
    consumerSecret: 'cKInwU1vO8ufFySEVbJuWoTYcx0SJbnGjygtANS930RIW9EwoV', // TWITTER_CONSUMER_SECRET,
    callbackURL: "http://localhost:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    User.findOne({twitter_id: profile.id}, function(err, user){
      if (err)  { return done(err); }
      if (user) { return done(null, user);  }

      var props = {
        twitterId : profile.id,
        username: profile.username,
        name: profile.displayName,
        photoUrl: profile.photos[0] && profile.photos[0].value,
        twitterData: profile._json
      }

      User.create(props, function(err, user){
        if (err) { return done(err); }
        return done(null, user);
      })
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// Redirect the user to Twitter for authentication.  When complete, Twitter
// will redirect the user back to the application at
//   /auth/twitter/callback
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/')
});

// Twitter will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { successRedirect: '/',
                                     failureRedirect: '/login' }));

// Server templates
app.get('/templates/:templateName.:ext', function(req,res){
  res.render(__dirname + '/client/templates/' + req.params.templateName)
});

app.all('*', function(req, res, next){
  res.locals.user = req.user;
  return next();
});

// App Routes
app.get('/', function(req, res){
  res.render('index', { controller: 'home'});
});

app.get('/genres/:slug/add-subgenre', genresController.newSubGenre);
app.get('/genres/:slug', genresController.show)

// API Routes
app.get('/api/genres', genresController.list)
app.post('/api/genres', genresController.create)
app.get('/api/genres/:slug', genresController.getGenreBySlug);

app.get('/api/genres/:genre_slug/definitions', definitionsController.list)
app.post('/api/genres/:genre_slug/definitions', definitionsController.create)

