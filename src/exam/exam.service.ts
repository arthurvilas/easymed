import { Prisma } from '@prisma/client';
import { db } from '../utils/db.server';

export const getAppointmentExams = async (appointmentId: number) => {
  return db.exam.findMany({ where: { appointmentId: appointmentId } });
};

export const getExam = async (examId: number) => {
  return db.exam.findUnique({ where: { id: examId } });
};

export const createExam = async (examData: Prisma.ExamCreateInput) => {
  return db.exam.create({ data: examData });
};

export const updateExam = async (
  examId: number,
  examData: Prisma.ExamUpdateInput
) => {
  return db.exam.update({ where: { id: examId }, data: examData });
};

export const deleteExam = async (examId: number) => {
  return db.exam.delete({ where: { id: examId } });
};
