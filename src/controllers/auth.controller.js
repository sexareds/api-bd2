import jwt from 'jsonwebtoken';
import passport from 'passport';
import authSecret from '../config/authSecret.js';

const postLogin = async (req, res, next) => {
    passport.authenticate('login', async (err, user, info) => {
        try{
            if(err){
                const error = new Error('An error occurred');
                return next(error);
            }
            if(!user){
                return res.status(401).json({ message: info.message });
            }
            req.login(user, { session: false }, async (error) => {
                if(error) return next(error);
                const body = { _id: user.user_id, email: user.email };
                const token = jwt.sign({ user: body }, authSecret.secret);
                return res.json({ token });
            });
        }catch(error){
            return next(error);
        }
    })(req, res, next);
};

const postSignup = async (req, res, next) => {
    passport.authenticate('signup', { session: false }, async(err, user, info) => {
        try{
            console.log(req.body);
            if(err){
                const error = new Error('An error occurred');
                return next(error);
                }
            const message = info.message;

            if(!user){
                res.status(401).json({ success: false, message });
                return
            }

            return res.json({succes: true, message});
        }catch(error){
            return next(error);
        }
    })(req, res, next);
};

const confirmMethod = async (req, res) => {
    passport.authenticate('confirm', async(err, user, info) => {
        try{
            if(err){
                const error = new Error('An error occurred');
                return next(error);
                }
            if(!user){
                res.status(401).json({success: false,message});
                return
            }
            return res.json({succes: true, message});
        }catch(error){
            return next(error);
        }
    })(req, res, next);
};

export {
    postLogin,
    postSignup,
    confirmMethod
}