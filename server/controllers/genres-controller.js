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