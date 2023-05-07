import { Router } from 'express';
import * as RatingController from './rating.controller';
import { getDoctorRatingsValidator } from './rating.validators';

export const doctorRatingRouter = Router({ mergeParams: true });

doctorRatingRouter.get(
  '/',
  getDoctorRatingsValidator,
  RatingController.getDoctorRatings
);
