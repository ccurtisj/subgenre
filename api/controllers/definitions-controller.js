var Definition = require('../models/definition'),
    Genre      = require('../models/genre');

module.exports.list = function(req, res){
  Genre.findOne({ slug: req.params.genre_slug }, function(err, genre){
    Definition
      .where({genre: genre})
      .sort('-createdAt')
      .exec(function(err, results){
      if (err) return console.log(err);
      res.json(results);
    });
  });
};

module.exports.create = function(req, res){
  var definition = new Definition(req.body);
  definition.save(function(err, result){
    if (err) return console.log(err);
    res.json(result.toJSON());
  });
};