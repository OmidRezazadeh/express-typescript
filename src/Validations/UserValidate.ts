import Joi from 'joi';

// Joi schema for email validation
const emailValidate = Joi.string()
    .email()
    .required()
    .messages({
        'string.base': 'ایمیل باید یک رشته باشد', // Custom error message for string base type
        'string.email': 'ایمیل باید یک آدرس ایمیل معتبر باشد', // Custom error message for invalid email format
        'any.required': 'ایمیل اجباری است', // Custom error message for required field
    });

// Joi schema for password validation
const passwordValidation = Joi.string().min(4).max(255).required()
    .messages({
        'string.min': 'رمز عبور باید حداقل ۴ کاراکتر باشد', // Custom error message for minimum length
        'string.max': 'رمز عبور نمی‌تواند بیشتر از ۲۵۵ کاراکتر باشد', // Custom error message for maximum length
        'any.required': 'رمز عبور اجباری است', // Custom error message for required field
    });

// Joi schema for user data validation
export const userValidate = Joi.object({
    name: Joi.string().required().min(4).max(255)
        .messages({
            'any.required': 'نام کامل اجباری است', // Custom error message for required field
            'string.min': 'نام کامل باید حداقل ۴ کاراکتر باشد', // Custom error message for minimum length
            'string.max': 'نام کامل نمی‌تواند بیشتر از ۲۵۵ کاراکتر باشد', // Custom error message for maximum length
        }),
    email: emailValidate, // Apply email validation schema
    password: passwordValidation, // Apply password validation schema
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().label('confirmPassword')
        .messages({
            'any.only': 'تأیید رمز عبور باید با رمز عبور مطابقت داشته باشد', // Custom error message for password match validation
            'any.required': 'تأیید رمز عبور اجباری است', // Custom error message for required field
        })
});

// Joi schema for login data validation
export const validationLogin = Joi.object({
    email: emailValidate, // Apply email validation schema
    password: passwordValidation, // Apply password validation schema
});

// Joi schema for confirmation code validation
export const validationConfirmationCode = Joi.object({
    email: emailValidate, // Apply email validation schema
});

export const validationUpdatePassword=Joi.object({
    email: emailValidate, // Apply email validation schema
    password: passwordValidation, // Apply password validation schema,
});
