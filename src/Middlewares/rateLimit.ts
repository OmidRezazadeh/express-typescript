import rateLimit from 'express-rate-limit';

// Setting up a rate limiter middleware for login requests
export const loginLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // Specifies a 1-minute time window for limiting requests
    max: 3, // Limits each IP to a maximum of 3 requests within the defined windowMs
    message: "درخواست بیش از حد مجاز است" // Message to be sent when limit is exceeded
});
