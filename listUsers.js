require('dotenv').config(); // Učitaj varijable iz .env datoteke
const mongoose = require('mongoose');
const User = require('./models/userModel'); // Pretpostavljam da imate userModel.js

const listUsers = async () => {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
        console.error('MONGO_URI not defined in .env file');
        process.exit(1);
    }

    try {
        // Povezivanje s MongoDB
        await mongoose.connect(mongoURI);
        console.log('Connected to MongoDB');

        // Dohvati sve korisnike iz kolekcije `users`
        const users = await User.find({});
        console.log('All Users:', users);

        // Zatvori konekciju s bazom podataka
        mongoose.connection.close();
    } catch (error) {
        console.error('Error fetching users:', error);
        mongoose.connection.close();
    }
};

// Pozovi funkciju za ispis korisnika
listUsers();
