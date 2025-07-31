const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, '.env', { expiresIn: '7d' });
};

module.exports = generateToken;
