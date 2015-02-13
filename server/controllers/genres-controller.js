var Genre = require('../models/genre');

module.exports.list = function(req, res){
  Genre.find({}, function(err, results){
    res.json(results)
  });
};

module.exports.create = function(req, res){
  var genre = new Genre(req.body)
  genre.save(function(err, result){
    res.json(result);
  });
}