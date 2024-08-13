const express = require('express');
const { getMessages, saveMessage } = require('../controllers/messageController'); // Provjerite da li funkcije postoje

const router = new express.Router();

// Provjerite postoji li funkcija `getMessages` u messageController.js
router.get('/', getMessages);

// Provjerite postoji li funkcija `saveMessage` u messageController.js
router.post('/save', saveMessage);

module.exports = router;
