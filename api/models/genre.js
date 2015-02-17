var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var genreSchema = new Schema({
  parentGenre : { type: Schema.Types.ObjectId, ref: 'Genre' },
  name : String,
  slug: String
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
  if(this.parentGenre == null) { return next([]); }

  return this.model('Genre')
    .where('parentGenre').equals(this.parentGenre)
    .where('_id').ne(this._id)
    .exec(function(err, siblings){
      if(err) return console.log(err);
        next(siblings);
  });
}

genreSchema.pre('save', function(next){
  this.slug = this.generateSlug();
  next();
});

genreSchema.methods.generateSlug = function(){
  return this.name.toLowerCase().replace(/\s+/, '-')
}

module.exports = mongoose.model('Genre', genreSchema);