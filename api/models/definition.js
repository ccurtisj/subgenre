var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema,
    timestamps  = require('mongoose-timestamp');

var DefinitionSchema = new Schema({
  genre : { type: Schema.Types.ObjectId, ref: 'Genre' },
  body : String,
  examples : String,
  alternatives: String
});

DefinitionSchema.plugin(timestamps);

module.exports = mongoose.model('Definition',  DefinitionSchema)