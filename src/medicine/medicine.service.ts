import { Prisma } from '@prisma/client';
import { db } from '../utils/db.server';

export const listMedicines = async () => {
  return db.medicine.findMany();
};

export const getPatientMedicines = async (patientId: number) => {
  return db.patientMedicine.findMany({
    where: { patientId },
    include: { medicine: true },
  });
};

export const createPatientMedicine = async (
  patientMedicineData: Prisma.PatientMedicineCreateInput
) => {
  return db.patientMedicine.create({
    data: patientMedicineData,
  });
};

export const updatePatientMedicine = async (
  patientId: number,
  medicineId: number,
  patientMedicineData: Prisma.PatientMedicineUpdateInput
) => {
  return db.patientMedicine.update({
    where: {
      patientId_medicineId: { patientId: patientId, medicineId: medicineId },
    },
    data: patientMedicineData,
  });
};

export const deletePatientMedicine = async (
  patientId: number,
  medicineId: number
) => {
  return db.patientMedicine.delete({
    where: { patientId_medicineId: { patientId, medicineId } },
  });
};
