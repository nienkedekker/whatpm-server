import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;
const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

/**
 * A pre-save hook is middleware that is executed when a document is saved.
 * Salting the user's password so we don't end up with plaintext passwords in our database.
 */
UserSchema.pre("save", function (next) {
  const user = this;
  if (user.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }
      bcrypt.hash(user.password, salt, null, (err, hash) => {
        if (err) {
          return next(err);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    return next();
  }
});

/**
 * When a password is salted, we'll still need to be able to compare a
 * given password to the pw in our database.
 */
UserSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

export default mongoose.model("User", UserSchema);
