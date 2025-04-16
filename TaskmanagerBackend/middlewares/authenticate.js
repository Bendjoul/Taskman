const jwt = require('jsonwebtoken')

const secretKey = process.env.JWT_SECRET;

const authenticate = (request, response, next) => {
    const accessToken = request.headers['authorization'];
    if (!accessToken) {
        return response.status(401).json('Access Denied. No token provided.');
    }
    
    try {
        const decoded = jwt.verify(accessToken, secretKey);
        request.user = decoded.userId;
        next();
    } catch (error) {
        return response.status(400).json('Votre Token est invalide.');
    }
}

module.exports = authenticate;