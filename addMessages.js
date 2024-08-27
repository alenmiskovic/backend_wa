// addMessages.js
require('dotenv').config();
const mongoose = require('mongoose');
const Message = require('./models/messageModel');

// Pripremite motivacijske poruke
const messages = [
  "Ostani pozitivan!",
  "Nikad ne odustaj!",
  "Snovi se ostvaruju kada radiš na njima!",
  "Svaki dan je nova prilika!",
  "Vjeruj u sebe i sve je moguće!"
];


mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('Povezivanje na MongoDB uspješno');

  
  return Message.insertMany(messages.map(text => ({ text })));
})
.then(() => {
  console.log('Poruke uspješno dodane u bazu podataka');
  mongoose.connection.close(); 
})
.catch((err) => {
  console.error('Greška pri povezivanju s bazom ili dodavanju poruka:', err);
});
