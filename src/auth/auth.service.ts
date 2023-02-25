import { compare } from 'bcrypt';
import { db } from '../utils/db.server';
import jwt from 'jsonwebtoken';

interface LoginDTO {
  email: string;
  password: string;
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
