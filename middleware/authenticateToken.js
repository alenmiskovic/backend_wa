const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];  // Izvlačimo token iz "Bearer <token>"

  console.log('Token received:', token);

  if (token == null) {
    console.log('No token provided, access denied');
    return res.sendStatus(401);  // Ako nema tokena, pristup je odbijen
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log('Invalid token:', err);
      return res.sendStatus(403);  // Ako token nije valjan, pristup je odbijen
    }

    console.log('Token is valid, user:', user);
    req.user = user;  // Postavljamo user objekat u req.user
    next();  // Nastavljamo na sljedeću funkciju
  });
};

module.exports = authenticateToken;
