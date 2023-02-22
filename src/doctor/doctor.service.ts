import { Prisma } from '@prisma/client';
import { hash } from 'bcrypt';
import { db } from '../utils/db.server';

export const listDoctors = async (specialty?: number) => {
  if (specialty) {
    return db.doctor.findMany({ where: { specialtyId: specialty } });
  }
  return db.doctor.findMany({ where: {} });
};

export const getDoctor = async (id: number) => {
  return db.doctor.findUnique({ where: { id } });
};

export const createDoctor = async (doctorData: Prisma.DoctorCreateInput) => {
  doctorData.password = await hash(doctorData.password, 8);
  return db.doctor.create({
    data: doctorData,
  });
};

export const updateDoctor = async (
  id: number,
  doctorData: Prisma.DoctorUpdateInput
) => {
  return db.doctor.update({
    where: {
      id,
    },
    data: doctorData,
  });
};

export const deleteDoctor = async (id: number) => {
  return db.doctor.delete({ where: { id } });
};
