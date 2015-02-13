var Genre = require('../models/genre');

module.exports.list = function(req, res){
  Genre.find({}, function(err, results){
    res.json(results)
  });
};

module.exports.create = function(req, res){
  var genre = new Genre(req.body)
  genre.save(function(err, result){
    if(err) return console.log(err);
    res.json(result);
  });
}

module.exports.show = function(req, res){
  Genre.findOne({name: req.params.genreName}, function(err, response){
    if(err) return console.log(err);
    res.render('genre', {genre: response})
  });
}

module.exports.getGenreByName = function(req, res){
  Genre.findOne({name: req.params.genreName}, function(err, genre){
    if(err) return console.log(err);

    // Find subgenres
    Genre.find({parentGenre: genre.id}, function(err, subGenres){
      if(err) return console.log(err);

      genre.subGenre = subGenres;
      res.json(genre);
    })
  });
}