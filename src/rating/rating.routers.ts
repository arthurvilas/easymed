import { Router } from 'express';
import * as RatingController from './rating.controller';

export const ratingRouter = Router({ mergeParams: true });

ratingRouter.get('/', RatingController.getDoctorRatings);

ratingRouter.post('/', RatingController.createRating);
