import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { JwtRefreshPayload } from '../types/jwtRefreshPayload';

export const authenticateRole = (...roles: string[]): RequestHandler => {
  return (req, res, next) => {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
      const payload = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as JwtRefreshPayload;

      if (roles.length !== 0 && !roles.includes(payload.role)) {
        throw new Error('Forbidden');
      }

      req.user = payload;
      next();
    } catch (error) {
      return res.status(403).json({ message: 'Forbidden' });
    }
  };
};
