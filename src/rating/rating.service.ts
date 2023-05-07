import { Prisma } from '@prisma/client';
import { db } from '../utils/db.server';

export const getRating = async (patientId: number, doctorId: number) => {
  return db.rating.findUnique({
    where: {
      patientId_doctorId: { patientId, doctorId },
    },
  });
};

export const updateRating = async (
  patientId: number,
  doctorId: number,
  ratingData: Prisma.RatingUpdateInput
) => {
  return db.rating.update({
    where: { patientId_doctorId: { patientId, doctorId } },
    data: ratingData,
  });
};

export const getDoctorRatings = async (doctorId: number) => {
  return db.rating.aggregate({
    _avg: { rating: true },
    _count: { rating: true },
    orderBy: { createdAt: 'desc' },
    where: { doctorId },
  });
};

export const createRating = async (ratingData: Prisma.RatingCreateInput) => {
  return db.rating.create({ data: ratingData });
};
