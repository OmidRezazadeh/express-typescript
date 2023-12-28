import Joi from "joi";

export const storeValidate=Joi.object({
    title:Joi.string().required().messages({
        'string.base': "عنوان باید از نوع رشته باشد",
        'any.required': 'عنوان اجباریست',
    }),
    
    description:Joi.string().required().messages({
        'string.base': "متن باید از نوع رشته باشد",
        'any.required': 'متن اجباریست',
    }),
    image:Joi.string().allow(null).optional().messages({
        'string.base': " نام عکس  باید از نوع رشته باشد", 
    })

})