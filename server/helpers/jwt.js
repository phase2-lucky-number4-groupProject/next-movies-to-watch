const jwt = require('jsonwebtoken');

function generateToken(payload)
{
    return jwt.sign(payload, process.env.privateKey);
}

function verifyToken(token)
{
    return jwt.verify(token, process.env.privateKey)
}

module.exports = { generateToken, verifyToken }