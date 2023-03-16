import { Prisma } from '@prisma/client';
import { db } from '../utils/db.server';

export const getAppointmentConditions = async (appointmentId: number) => {
  return db.condition.findMany({
    where: {
      appointmentId: appointmentId,
    },
  });
};

export const getPatientConditions = async (patientId: number) => {
  return db.condition.findMany({
    where: {
      appointment: {
        patientId: patientId,
      },
    },
  });
};

export const createCondition = async (
  conditionData: Prisma.ConditionCreateInput
) => {
  return db.condition.create({ data: conditionData });
};

export const updateCondition = async (
  conditionId: number,
  conditionData: Prisma.ConditionUpdateInput
) => {
  return db.condition.update({
    where: { id: conditionId },
    data: conditionData,
  });
};

export const deleteCondition = async (conditionId: number) => {
  return db.condition.delete({ where: { id: conditionId } });
};
