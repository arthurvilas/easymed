import { Prisma } from '@prisma/client';
import { db } from '../utils/db.server';

export const listAllergies = async () => {
  return db.allergy.findMany();
};

export const getPatientAllergies = async (patientId: number) => {
  return db.patientAllergy.findMany({ where: { patientId } });
};

export const createPatientAllergy = async (
  patientAllergyData: Prisma.PatientAllergyCreateInput
) => {
  return db.patientAllergy.create({
    data: {
      ...patientAllergyData,
    },
  });
};

export const deletePatientAllergy = async (
  patientId: number,
  allergyId: number
) => {
  return db.patientAllergy.delete({
    where: { patientId_allergyId: { patientId, allergyId } },
  });
};
