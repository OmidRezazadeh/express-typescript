import { NextFunction, Request, Response } from "express";
import User from '../Models/User';
export const store = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email, password });
        await user.save();
        res.json(user).status(201);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}