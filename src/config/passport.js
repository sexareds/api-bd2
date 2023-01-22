import passportLocal from 'passport-local'
const localStrategy = passportLocal.Strategy
import JWTStrategy from 'passport-jwt'
import ExtractJWT from 'passport-jwt'
import bcrypt from 'bcrypt'
import authSecret from './authSecret.js'
import { getUsers, createUser, updateUser, deleteUser, findUser } from './../services/users.services.js'
import { getToken, getTokenData } from './../config/jwt.config.js'
import passport from 'passport'
import { CLIENT_RENEG_LIMIT } from 'tls'


export const login = async (req, res) => {
    let { email, password } = req.body;
//Buscar usuario
    const user = (await findUser(email))[0][0];
    console.log(user);
    if (user.length === 0) {
        return responses.errorDTOResponse(res, 404, 'Usuario no encontrado');
    }
    //Comparar password
    if (user.user_password === req.body.user_password) {
        //Generar token
        console.log('si')
        const token = getToken(user);
        const item = { user, token };
        console.log(item)
        return res.json({ message: 'Usuario logeado con exito', item: item })
    } else {
        return res.json({ message: 'Contraseña incorrecta' })
    }
}


export default (passport) => {

    // passport.use('login', new localStrategy({
    //     username: 'email',
    //     password: 'password'
    // }, async (email, password, done) => {
    //     try {
    //         const user = await findUser(email);
    //         if (user.length === 0) {
    //             return done(null, false, { message: 'User not found' });
    //         }

    //         if(user.password === password){
    //             return done(null, user[0], { message: 'Logged in Successfully' });
    //         }
    //     }
    //     catch (error) {
    //         return done(error);
    //     }
    // }));
    

    passport.use('signup', new localStrategy({
        username: 'email',
        password: 'password',
        passReqToCallback: true
        }, async (req, email, password, done) => {
            try {
                console.log('si')
                const user = await findUser(email);
                if (user.length > 0) {
                    return done(null, false, { message: 'User already exists' });
            }

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);

            const newUser = {
                user_name: req.body.user_name,
                user_role: 'user',
                email: email,
                user_password: hash
            };

            console.log(newUser);
            await createUser(newUser);
            return done(null, newUser);
            }
            catch (error) {
                console.log('si')
                done(error);
            }
        }
    ));
    
    var opts = {};
    opts.jwtFromRequest = ExtractJWT.ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = authSecret;
    passport.use(new JWTStrategy.Strategy(opts, async (jwt_payload, done) => {
        try {
            const user = await findUser(jwt_payload.email);
            if (user.length === 0) {
                return done(null, false);
            }
            return done(null, user[0]);
        }
        catch (error) {
            return done(error, false);
        }
    }));
}