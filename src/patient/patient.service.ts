import { Prisma } from '@prisma/client';
import { db } from '../utils/db.server';
import { hash } from 'bcrypt';

export const listPatients = async () => {
  return db.patient.findMany();
};

export const getPatient = async (id: number) => {
  return db.patient.findUnique({ where: { id } });
};

export const createPatient = async (patientData: Prisma.PatientCreateInput) => {
  patientData.password = await hash(patientData.password, 8);
  return db.patient.create({
    data: patientData,
  });
};

export const updatePatient = async (
  id: number,
  patientData: Prisma.PatientUpdateInput
) => {
  return db.patient.update({ where: { id }, data: patientData });
};

export const deletePatient = async (id: number) => {
  return db.patient.delete({ where: { id } });
};
