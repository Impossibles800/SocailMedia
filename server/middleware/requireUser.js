const {error} = require('../utils/responseWrapper');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    if (!req.headers || !req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
        return res.send(error(401, 'Authorization header is missing or invalid'));
    }
    const accessToken = req.headers.authorization.split(' ')[1];
    // console.log(`Access token from middleware: ${accessToken}`);
    try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_PRIVATE_KEY);
        req._id = decoded.id;
        next();
    } catch (e) {
        console.log(e);
        return res.send(error(401, 'Invalid access token'));
    }
}
