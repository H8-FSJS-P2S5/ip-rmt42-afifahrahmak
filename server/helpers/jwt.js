const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const createToken = (req) => {
    const token = jwt.sign(req, secretKey);
    return token;
}

const verifyToken = (req) => {
    const decoded = jwt.verify(req, secretKey);
    return decoded;
}

module.exports = { createToken, verifyToken };