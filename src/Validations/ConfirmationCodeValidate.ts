import Joi from 'joi';

// Define Joi schema for email validation
const emailValidate = Joi.string()
    .email() // Ensure the value is in email format
    .required() // Make the email field required
    .messages({
        'string.base': 'ایمیل باید یک رشته باشد', // Custom error message for string base type
        'string.email': 'ایمیل باید یک آدرس ایمیل معتبر باشد', // Custom error message for invalid email format
        'any.required': 'ایمیل اجباری است', // Custom error message for required field
    });

// Define validation schema for confirmation code data
export const validationConfirmationCode = Joi.object({
    email: emailValidate, // Apply email validation schema to the 'email' field
});
