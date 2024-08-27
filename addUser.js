require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/userModel');

const addUser = async () => {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
        console.error('MONGO_URI not defined in .env file');
        process.exit(1);
    }

    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB');

        const username = 'alen';
        const password = 'miskovic';  

        const user = new User({
            username,
            password
        });

        await user.save();
        console.log('User added successfully');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

addUser();
