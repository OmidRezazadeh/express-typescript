import Joi from "joi";
export const assignRole=Joi.object({
    name:Joi.string().messages({
        'string.base': "نقش باید از نوع رشته باشد",
        
    })
})