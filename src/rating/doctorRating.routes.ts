import { Router } from 'express';
import * as RatingController from './rating.controller';

export const doctorRatingRouter = Router({ mergeParams: true });

doctorRatingRouter.get('/', RatingController.getDoctorRatings);