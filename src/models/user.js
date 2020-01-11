const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');

const { Schema } = mongoose;

const userSchema = new Schema({
  _id: { type: String, default: uuidv4 },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  registeredAt: { type: Date, default: Date.now, required: true },
});

module.exports = mongoose.model('User', userSchema);
