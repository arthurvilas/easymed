import { Router } from 'express';
import * as AuthController from './auth.controller';

export const authRouter = Router();

authRouter.post('/login', AuthController.login);

authRouter.post('/refresh', AuthController.refresh);
