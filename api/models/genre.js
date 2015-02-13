var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var genreSchema = new Schema({
  parentGenre : { type: Schema.Types.ObjectId, ref: 'Genre' },
  name : String
})

module.exports = mongoose.model('Genre', genreSchema);