require('dotenv').config(); // Učitaj konfiguracijske varijable iz .env datoteke
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Učitaj rute
const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');

const app = express();
const port = process.env.PORT || 3001; // Koristi port iz .env ili default na 3001

// Middleware
app.use(express.json());
app.use(cors());

// Rute
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

// Dohvati MongoDB URI iz .env datoteke
const mongoURI = process.env.MONGO_URI; // Ovdje koristimo MONGO_URI

if (!mongoURI) {
  console.error('MONGO_URI not defined in .env file');
  process.exit(1); // Prekini aplikaciju ako MONGO_URI nije definiran
}

// Povezivanje s MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error: ', err);
    process.exit(1); // Prekini aplikaciju ako se ne može povezati s MongoDB
  });

// Pokreni server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
