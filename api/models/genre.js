var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var genreSchema = new Schema({
  parentGenre : { type: Schema.Types.ObjectId, ref: 'Genre' },
  name : String
})

genreSchema.methods.findSubGenres = function(next){
  return this.model('Genre')
    .find({parentGenre: this._id})
    .exec(function(err, subGenres){
    if(err) return console.log(err);
      next(subGenres);
  });
}

genreSchema.methods.findSiblings = function(next){
  return this.model('Genre')
    .find({parentGenre: this.parentGenre})
    .exec(function(err, siblings){
      if(err) return console.log(err);
        next(siblings);
  });
}

module.exports = mongoose.model('Genre', genreSchema);