const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';

const signToken = (payload) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
};

const verifyToken = (token) => {
    return jwt.verify(token, JWT_SECRET);
};

module.exports = {
    signToken,
    verifyToken,
};