const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Provjerite da je put ispravan

// Ruta za prijavu
router.post('/login', userController.login);




module.exports = router;
