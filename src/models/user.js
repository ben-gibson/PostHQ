const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');
const crypto = require('@security/crypto');
const mongooseHidden = require('mongoose-hidden')({ defaultHidden: { password: true } });

const { Schema } = mongoose;

const userSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  name: {
    type: String, required: true, trim: true, minlength: 3,
  },
  email: {
    type: String, required: true, unique: true, lowercase: true,
  },
  password: {
    type: String, required: true, select: false, minlength: 8,
  },
  registeredAt: { type: Date, default: Date.now, required: true },
});

userSchema.plugin(mongooseHidden);

userSchema.pre('save', async function save(next) {
  // If the password hasn't changed then do not try and re-hash it!
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await crypto.hash(this.password);

  return next();
});

module.exports = mongoose.model('User', userSchema);
