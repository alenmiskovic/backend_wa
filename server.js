const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const messageRoutes = require('./routes/messageRoutes');

const app = express();
const port = process.env.PORT || 3001; 

mongoose.connect(process.env.MONGODB_URI, {
    
}).then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error: ", err));

app.use(cors());
app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
