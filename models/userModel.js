// models/userModel.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }]  // Dodano polje za omiljene poruke
});

module.exports = mongoose.model('User', UserSchema);
