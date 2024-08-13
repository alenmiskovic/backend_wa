const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'Invalid login credentials' });
        }

        if (user.password !== password) {
            return res.status(400).json({ error: 'Invalid login credentials' });
        }

        // Koristimo JWT_SECRET iz .env datoteke
        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            throw new Error('JWT_SECRET is not defined');
        }

        // Generiranje JWT tokena
        const token = jwt.sign({ _id: user._id }, secretKey);
        res.json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.register = async (req, res) => {
    const { username, password } = req.body;

    try {
        const newUser = new User({ username, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
