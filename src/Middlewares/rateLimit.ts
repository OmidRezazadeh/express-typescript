import rateLimit  from 'express-rate-limit';

export const loginLimiter =rateLimit({
   windowMs: 1 *60 *1000, 
    max:3,
    message:"درخواست بیش از حد مجاز است"
})