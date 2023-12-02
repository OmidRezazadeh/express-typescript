import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticated = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization');

  try {
    if (!authHeader) {
      return res.status(400).json({ message: 'مجوز کافی ندارید' });
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as { user: { userId: string } };

    if (!decodedToken) {
      return res.status(400).json({ message: 'مجوز کافی ندارید' });
    }

    req.body.userId = decodedToken.user.userId;
    next();
  } catch (err) {
    next(err);
  }
};
