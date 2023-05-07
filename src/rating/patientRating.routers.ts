import { Router } from 'express';
import * as RatingController from './rating.controller';
import {
  createRatingValidator,
  getRatingValidator,
  updateRatingValidator,
} from './rating.validators';

export const patientRatingRouter = Router({ mergeParams: true });

patientRatingRouter.get('/', getRatingValidator, RatingController.getRating);

patientRatingRouter.post(
  '/',
  createRatingValidator,
  RatingController.createRating
);

patientRatingRouter.patch(
  '/',
  updateRatingValidator,
  RatingController.updateRating
);
