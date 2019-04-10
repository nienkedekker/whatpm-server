import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import bcrypt from 'bcrypt-nodejs';

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

/**
 * A pre-save hook is middleware that is executed when a document is saved.
 * Salting the user's password so we don't end up with plaintext passwords in our database.
 */
UserSchema.pre('save', function(this: any, next: any) {
  const user = this;
  if (user.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (err: Error, salt: string) {
      if (err) { return next(err); }
      bcrypt.hash(user.password, salt, null, function (err: Error, hash: any) {
        if (err) { return next(err); }
        user.password = hash;
        next();
      });
    });
  } else { return next(); }
});

/**
 * When a password is salted, we'll still need to be able to compare a given password to the pw in our database.
 */
UserSchema.methods.comparePassword = function (password: any, cb: any) {
  bcrypt.compare(password, this.password, function (err: Error, isMatch: boolean) {
    if (err) { return cb(err); }
    cb(null, isMatch);
  });
};

export default mongoose.model('User', UserSchema);
