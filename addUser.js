const mongoose = require('mongoose');
const User = require('./models/userModel');
require('dotenv').config();

const addUser = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const username = 'alen';
        const password = 'miskovic';

        const user = new User({ username, password });

        try {
            await user.save();
            console.log('User added successfully');
        } catch (error) {
            console.error('Error adding user:', error);
        } finally {
            mongoose.connection.close();
        }
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

addUser();
