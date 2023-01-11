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


export default (passport) => {

    passport.use('login', new localStrategy({
        usernameField: 'email',
        passwordField: 'password'
        }, async (email, password, done) => {
            try {
                const user = await findUser(email);
                if (user.length === 0) {
                    return done(null, false, { message: 'User not found' });
                }
                const validate = await bcrypt.compare(password, user.user_password);
                if (!validate) {
                    return done(null, false, { message: 'Wrong Password' });
                }
                return done(null, user, { message: 'Logged in Successfully' });
            }
            catch (error) {
                return done(error);
            }
        }
    ));

    passport.use('signup', new localStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
        }, async (email, password, done) => {
            try {
                console.log('si')
                const user = await findUser(email);
                if (user.length > 0) {
                    return done(null, false, { message: 'User already exists' });
            }

            const newUser = {
                user_name: req.body.user_name,
                user_role: req.body.user_role,
                email: email,
                user_password: password
            };

            console.log(newUser);
            const result = await createUser(newUser);
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