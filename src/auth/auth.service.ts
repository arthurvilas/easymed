import { compare } from 'bcrypt';
import { db } from '../utils/db.server';
import jwt from 'jsonwebtoken';
import { JwtRefreshPayload } from '../types/jwtRefreshPayload';

interface LoginDTO {
  email: string;
  password: string;
}

export const login = async (userData: LoginDTO) => {
  const [patient, doctor] = await Promise.all([
    db.patient.findUnique({
      where: { email: userData.email },
    }),
    db.doctor.findUnique({
      where: { email: userData.email },
    }),
  ]);

  const foundUser = patient ? patient : doctor;

  if (!foundUser) {
    throw new Error('No user with email ' + userData.email);
  }

  const role = patient ? 'patient' : 'doctor';

  const passwordMatch = await compare(userData.password, foundUser.password);
  if (!passwordMatch) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign(
    { id: foundUser.id, name: foundUser.name, email: foundUser.email, role },
    process.env.JWT_SECRET as string,
    { expiresIn: '2 days' }
  );

  return { role, user: foundUser, token };
};

export const refresh = (token: string) => {
  const payload = jwt.verify(
    token,
    process.env.JWT_SECRET as string
  ) as JwtRefreshPayload;

  const newToken = jwt.sign(
    {
      id: payload.id,
      name: payload.name,
      email: payload.email,
      role: payload.role,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: '2 days' }
  );
  return { refreshedToken: newToken, payload };
};
