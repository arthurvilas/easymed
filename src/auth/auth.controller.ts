import { RequestHandler } from 'express';

import * as AuthService from './auth.service';

export const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await AuthService.login({ email, password });
    return res.status(200).json(user);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};
