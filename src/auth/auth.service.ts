import { compare } from 'bcrypt';
import { db } from '../utils/db.server';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface LoginDTO {
  email: string;
  password: string;
}

interface JwtRefreshPayload extends JwtPayload {
  id: number;
  name: string;
  email: string;
}

export const login = async (patientData: LoginDTO) => {
  const foundPatient = await db.patient.findUnique({
    where: { email: patientData.email },
  });
  if (!foundPatient) {
    throw new Error('No patient with email ' + patientData.email);
  }

  const passwordMatch = await compare(
    patientData.password,
    foundPatient.password
  );
  if (!passwordMatch) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign(
    { id: foundPatient.id, name: foundPatient.name, email: foundPatient.email },
    process.env.JWT_SECRET as string,
    { expiresIn: '2 days' }
  );

  return { patient: foundPatient, token };
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
    },
    process.env.JWT_SECRET as string,
    { expiresIn: '2 days' }
  );
  return newToken;
};
