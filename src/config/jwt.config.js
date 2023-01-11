import jwt from 'jsonwebtoken';

const getToken = (payload) => {
    return jwt.sign({
        data : payload
    }, 'secret', { expiresIn: '1h' });
};

const getTokenData = (token) => {
    let data = null;
    jwt.verify(token, 'secret', (err, decoded) => {
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