import Joi from 'joi';
export const updateUserInformation=Joi.object({
bio:Joi.string().messages({
    'string.base': " متن بیو باید رشته باشد",
}),
link:Joi.string().uri().messages({
    'string.uri': 'لطفا یک آدرس اینترنتی معتبر وارد کنید.', // Custom error message for URI validation
    'string.base': 'ادرس اینترنتی  باید رشته  باشد',
  }),
image:Joi.string().messages({
    'string.base': 'باید از نوع  رشته باشد'
}),

})