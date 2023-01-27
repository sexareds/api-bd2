import jwt from 'jsonwebtoken';
import authSecret from '../config/authSecret.js'

const config = process.env;

export const verifyToken = (req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['Token'] || req.headers.authorization;
    token = token.replace('Bearer ', '');
    if (!token) {
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    }
    jwt.verify(token, authSecret, (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }
        req.userId = decoded.id;
        next();
    });
};

export const verifyAdmin = (req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['Token'] || req.headers.authorization;
    token = token.replace('Bearer ', '');
    if (!token) {
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    }
    jwt.verify(token, authSecret, (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }
        if (decoded.data.user_role === 'administrator') {
            next();
        } else {
            return res.status(403).send({ auth: false, message: 'You are not an admin.' });
        }
    });
};

export const verifyDailyToken = (req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['DailyToken']
    if (!token) {
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    }
    jwt.verify(token, authSecret, (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }
        req.userId = decoded.id;
        next();
    });
}