const Message = require('../models/messageModel');
const User = require('../models/userModel');

exports.getRandomMessage = async (req, res) => {
    const randomIndex = Math.floor(Math.random() * motivationalMessages.length);
    const messageContent = motivationalMessages[randomIndex];

    let message = await Message.findOne({ content: messageContent });
    if (!message) {
        message = new Message({ content: messageContent });
        await message.save();
    }

    res.json({ message: messageContent });
};

exports.saveFavoriteMessage = async (req, res) => {
    const { message } = req.body;
    const userId = req.user.id;  // Pretpostavljam da je `user` objekat dostupan nakon autentifikacije

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }

        const messageDoc = await Message.findOne({ text: message });
        if (!messageDoc) {
            return res.status(404).json({ success: false, error: "Message not found" });
        }

        if (!user.favorites.includes(messageDoc._id)) {
            user.favorites.push(messageDoc._id);
            await user.save();
        }

        res.json({ success: true, message: "Message saved to favorites" });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};



exports.getMessages = (req, res) => {
    res.status(200).json({ message: 'Dummy message retrieved' });
};

exports.saveMessage = (req, res) => {
    res.status(200).json({ message: 'Dummy message saved' });
};
