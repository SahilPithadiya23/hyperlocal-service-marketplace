const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

async function authUserMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'please login first' });
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded.id);
        req.user = user;
        next();
    }catch(error){
        return res.status(401).json({ message: 'invalid token' });
    }
}

async function authSproviderMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'please login first' });
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const serviceprovider = await userModel.findById(decoded.id);  
        req.serviceprovider = serviceprovider;
        next();
    }catch(error){
        return res.status(401).json({ message: 'invalid token' });
    }
}

module.exports = {
    authUserMiddleware,
    authSproviderMiddleware
};