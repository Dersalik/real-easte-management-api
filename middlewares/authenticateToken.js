const jwt = require('jsonwebtoken');
const config = require('../config/config.js');

// Middleware to authenticate API requests
function authenticateToken(req, res, next) {
    const excludedRoutes = ['/register', '/login']; // Define the routes to be excluded from authentication
    const token = req.headers.authorization?.split(' ')[1];
    const currentRoute = req.originalUrl;


    const isExcluded = excludedRoutes.some((route) => currentRoute.includes(route));


    if (isExcluded) {
        // Skip authentication for excluded routes
        next();
        return;
    } 
    else if (!token) {
      return res.status(401).json({ message: 'Authentication required' });}
    else {
        jwt.verify(token, config.secretKey, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Invalid token' });
            }
            req.user = user;
            next();
        });
    }
}

module.exports = authenticateToken;
