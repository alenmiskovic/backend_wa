const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Middleware za hashiranje lozinke prije pohrane korisnika
userSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')) {
        console.log('Hashing password for user:', user.username); // Log za provjeru
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
