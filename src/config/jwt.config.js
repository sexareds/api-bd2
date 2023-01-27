import jwt from 'jsonwebtoken';
import authSecret from './authSecret.js'

const getToken = (payload) => {
    return jwt.sign({
        data : payload
    }, authSecret, { expiresIn: '1h' });
};

const getTokenData = (token) => {
    let data = null;
    jwt.verify(token, authSecret, (err, decoded) => {
        if (err) {
            console.log('Error al obtener el token');
        } else {
            data = decoded;
        }
    });
    return data;
};

export {
    getToken,
    getTokenData
};