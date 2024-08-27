require('dotenv').config(); 
const mongoose = require('mongoose');
const User = require('./models/userModel'); 

const listUsers = async () => {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
        console.error('MONGO_URI not defined in .env file');
        process.exit(1);
    }

    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB');

        const users = await User.find({});
        console.log('All Users:', users);

        mongoose.connection.close();
    } catch (error) {
        console.error('Error fetching users:', error);
        mongoose.connection.close();
    }
};

listUsers();
