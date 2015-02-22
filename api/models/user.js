var mongoose    = require('mongoose'),
    Schema      = mongoose.Schema,
    timestamps  = require('mongoose-timestamp');

var UserSchema = new Schema({
  twitterId : Number,
  username: String,
  name: String,
  photoUrl: String,
  twitterData: Schema.Types.Mixed
});

UserSchema.plugin(timestamps);

module.exports = mongoose.model('User',  UserSchema);