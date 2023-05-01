const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

//creating a user Schema
const userSchema = new Schema({
  firstName: { type: String, required: [true, 'The first name is required'] },
  lastName: { type: String, required: [true, 'The last name is required'] },
  email: { type: String, required: [true, 'The email address is required'], unique: [true, 'This email has been used already'] },
  password: { type: String, required: [true, 'The password is required'] },
});

//hashing the password
userSchema.pre('save', function (next) {
  let user = this;
  if (!user.isModified('password'))
    return next();
  bcrypt.hash(user.password, 10)
    .then(hash => {
      user.password = hash;
      next();
    })
    .catch(err => next(err));
});

//comparing password function
userSchema.methods.comparePassword = function (inputPassword) {
  let user = this;
  return bcrypt.compare(inputPassword, user.password);
}

//exporting the user schema
module.exports = mongoose.model('User', userSchema);
