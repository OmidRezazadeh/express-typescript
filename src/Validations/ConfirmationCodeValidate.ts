
import Joi from 'joi';


export const validationConfirmationCode= Joi.object({
   email: Joi.string()
        .email()
        .required()
        .messages({
            'string.base': 'ایمیل باید یک رشته باشد',
            'string.email': 'ایمیل باید یک آدرس ایمیل معتبر باشد',
            'any.required': 'ایمیل اجباری است',
        }),
})
