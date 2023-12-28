const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateToken(req, res, next) {
    const token = req.header("Authorization");
    if (!token) return res.status(401).send('Access denied');
    
    jwt.verify(token, process.env.API_SECRET_KEY , (err) => {
        if (err) return res.status(403).send('Invalid Token.');
        next()
    });
}



function getToken() {
    jwt_token = {"token": jwt.sign({ admin: "quoicouamin" }, process.env.API_SECRET_KEY)}
    // jwt_token = {"token":"If you want to access tihs API, you need to ask for a token on : https://github.com/rochesebastien"}
    return jwt_token;
}

module.exports = { authenticateToken, getToken};