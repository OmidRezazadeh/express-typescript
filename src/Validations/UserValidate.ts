
import Joi from 'joi';
const emailValidate = Joi.string()
    .email()
    .required()
    .messages({
        'string.base': 'ایمیل باید یک رشته باشد',
        'string.email': 'ایمیل باید یک آدرس ایمیل معتبر باشد',
        'any.required': 'ایمیل اجباری است',
    });
const passwordValidation = Joi.string().min(4).max(255).required()
    .messages({
        'string.min': 'رمز عبور باید حداقل ۴ کاراکتر باشد',
        'string.max': 'رمز عبور نمی‌تواند بیشتر از ۲۵۵ کاراکتر باشد',
        'any.required': 'رمز عبور اجباری است',
    });



export const userValidate = Joi.object({
    name: Joi.string().required().min(4).max(255)
        .messages({
            'any.required': 'نام کامل اجباری است',
            'string.min': 'نام کامل باید حداقل ۴ کاراکتر باشد',
            'string.max': 'نام کامل نمی‌تواند بیشتر از ۲۵۵ کاراکتر باشد',
        }),
    email: emailValidate,
    password: passwordValidation,

    confirmPassword: Joi.string().valid(Joi.ref('password')).required().label('confirmPassword')
        .messages({
            'any.only': 'تأیید رمز عبور باید با رمز عبور مطابقت داشته باشد',
            'any.required': 'تأیید رمز عبور اجباری است',
        })

});


export const validationLogin = Joi.object({
    email: emailValidate,
    password: passwordValidation,
})
