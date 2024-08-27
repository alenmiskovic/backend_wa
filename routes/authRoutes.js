const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); 

// Ruta za prijavu
router.post('/login', userController.login);




module.exports = router;
