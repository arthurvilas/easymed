import { Doctor, Patient } from '@prisma/client';
import { RequestHandler } from 'express';
import { getDoctor } from '../doctor/doctor.service';
import { getPatient } from '../patient/patient.service';

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

export const refresh: RequestHandler = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json('Invalid token');
    }

    const { refreshedToken, payload } = AuthService.refresh(token);

    let user: Patient | Doctor | null = null;

    if (payload.role === 'patient') {
      user = await getPatient(payload.id);
    } else if (payload.role === 'doctor') {
      user = await getDoctor(payload.id);
    }

    if (!user) {
      return res.status(400).json('Invalid token');
    }

    return res
      .status(200)
      .json({ token: refreshedToken, role: payload.role, user });
  } catch (error: any) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
