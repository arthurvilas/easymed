import { Router } from 'express';
import * as RatingController from './rating.controller';

export const patientRatingRouter = Router({ mergeParams: true });

patientRatingRouter.get('/', RatingController.getRating);

patientRatingRouter.post('/', RatingController.createRating);

patientRatingRouter.patch('/', RatingController.updateRating);
