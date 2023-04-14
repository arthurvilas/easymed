import { Prisma } from '@prisma/client';
import { db } from '../utils/db.server';

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
