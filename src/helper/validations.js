import { body, validationResult } from 'express-validator';


const validate = validations => {
    return async (req, res, next) => {
        for(let validation of validations){
            const result = await validation.run(req);
            if(result.errors.lenght) break;
        }

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        res.status(400).json({success: false, message: 'some validations Failed', errors: errors.array() });
    };
};

const validateSignUp = validations => {
    return async (req, res, next) => {
        for(let validation of validations){
            const result = await validation.run(req);
            if(result.errors.lenght) break;
        }

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        res.status(400).json({success: false, message: 'some validations Failed', errors: errors.array() });
    };
};

const validatePostSignUp = validateSignUp([
    body('email')
        .exists().withMessage('email is required').bail()
        .isEmail().withMessage('email is not valid').bail(),
        
    body('user_password')
        .exists().withMessage('password is required').bail()
        .isString().withMessage('password must be a string').bail()
        .isLength({ min: 8, max: 20 }).withMessage('password must have between 8 and 20 characters').bail(),

    body('user_name')
        .exists().withMessage('name is required').bail()
        .isString().withMessage('name must be a string').bail()
        .isLength({ min: 2, max: 30 }).withMessage('name must have between 3 and 30 characters').bail(),

]);

const validatePostLogin = validate([
    body('email')
        .exists().withMessage('email is required').bail()
        .isEmail().withMessage('email is not valid').bail(),
    body('user_password')
        .exists().withMessage('password is required').bail()
        .isString().withMessage('password must be a string').bail()
]);

export {
    validatePostLogin,
    validatePostSignUp,
    validate
};
