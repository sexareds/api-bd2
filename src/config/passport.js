import passportLocal from 'passport-local'
const localStrategy = passportLocal.Strategy
import JWTStrategy from 'passport-jwt'
import ExtractJWT from 'passport-jwt'
import bcrypt from 'bcrypt'
import authSecret from './authSecret.js'
import usersServices, { findUser } from './../services/users.services.js'
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

export const signup = async (req, res) => {
  try {
    const { body } = req;

    //Buscar usuario
    const user = (await findUser(body.email))[0][0];

    // Validacion si el usuario existe
    if (user) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    // Validacion de todos los campos del registro
    if (!(body.user_name && body.user_role && body.email && body.user_password)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide all fields' 
      });
    }

    // Encriptar password
    const encryptedPassword = await bcrypt.hash(body.user_password, 10);

    // Crear usuario
    const userToRegister = {
      userName: body.user_name,
      userRole: body.user_role,
      email: body.email,
      userPassword: encryptedPassword
    }

    const registeredUser = await usersServices.createUser(userToRegister);

    console.log(registeredUser)

    if (!registeredUser[0].affectedRows) {
      return res.status(400).json({ 
        success: false, 
        message: 'User not created' 
      });
    }

    // Generar token
    const token = getToken(registeredUser);

    res.status(201).json({ 
      message: 'Usuario registrado con exito', 
      item: { user: userToRegister, token } 
    });
  } catch (error) {
    console.log(error);
  }
};











// export default (passport) => {

//     // passport.use('login', new localStrategy({
//     //     username: 'email',
//     //     password: 'password'
//     // }, async (email, password, done) => {
//     //     try {
//     //         const user = await findUser(email);
//     //         if (user.length === 0) {
//     //             return done(null, false, { message: 'User not found' });
//     //         }

//     //         if(user.password === password){
//     //             return done(null, user[0], { message: 'Logged in Successfully' });
//     //         }
//     //     }
//     //     catch (error) {
//     //         return done(error);
//     //     }
//     // }));
    

//     passport.use('signup', new localStrategy({
//         username: 'email',
//         password: 'password',
//         passReqToCallback: true
//         }, async (req, email, password, done) => {
//             try {
//                 console.log('si')
//                 const user = await findUser(email);
//                 if (user.length > 0) {
//                     return done(null, false, { message: 'User already exists' });
//             }

//             const salt = await bcrypt.genSalt(10);
//             const hash = await bcrypt.hash(password, salt);

//             const newUser = {
//                 user_name: req.body.user_name,
//                 user_role: 'user',
//                 email: email,
//                 user_password: hash
//             };

//             console.log(newUser);
//             await createUser(newUser);
//             return done(null, newUser);
//             }
//             catch (error) {
//                 console.log('si')
//                 done(error);
//             }
//         }
//     ));
    
//     var opts = {};
//     opts.jwtFromRequest = ExtractJWT.ExtractJwt.fromAuthHeaderAsBearerToken();
//     opts.secretOrKey = authSecret;
//     passport.use(new JWTStrategy.Strategy(opts, async (jwt_payload, done) => {
//         try {
//             const user = await findUser(jwt_payload.email);
//             if (user.length === 0) {
//                 return done(null, false);
//             }
//             return done(null, user[0]);
//         }
//         catch (error) {
//             return done(error, false);
//         }
//     }));
// }