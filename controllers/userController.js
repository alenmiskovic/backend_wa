const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.login = async (req, res) => {
    const { username, password } = req.body;
    console.log('Received login request:', { username, password });

    try {
        const user = await User.findOne({ username });
        console.log('User found:', user);

        if (!user) {
            console.log('User not found');
            return res.status(400).json({ error: 'Invalid login credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Password match:', isMatch);

        if (!isMatch) {
            console.log('Password does not match');
            return res.status(400).json({ error: 'Invalid login credentials' });
        }

        const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
        console.log('Token generated:', token);

        res.json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: error.message });
    }
};
