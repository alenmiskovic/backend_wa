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

// Povezivanje na MongoDB bazu podataka
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('Povezivanje na MongoDB uspješno');

  // Dodavanje poruka u bazu podataka
  return Message.insertMany(messages.map(text => ({ text })));
})
.then(() => {
  console.log('Poruke uspješno dodane u bazu podataka');
  mongoose.connection.close(); // Zatvaranje veze s bazom
})
.catch((err) => {
  console.error('Greška pri povezivanju s bazom ili dodavanju poruka:', err);
});
