require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Rute za autentifikaciju
app.use('/api/auth', authRoutes);

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error: ', err);
    process.exit(1);
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
