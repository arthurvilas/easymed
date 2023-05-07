import { body, param } from 'express-validator';

export const getRatingValidator = [
  param('patientId').isInt(),
  param('doctorId').isInt(),
];

export const updateRatingValidator = [
  param('patientId').isInt(),
  param('doctorId').isInt(),
  body('rating')
    .isInt({ max: 5, min: 1 })
    .withMessage("Property 'rating' should exist and range between 1 and 5 "),
];

export const getDoctorRatingsValidator = [param('doctorId').isInt()];

export const createRatingValidator = [
  param('patientId').isInt(),
  param('doctorId').isInt(),
  body('rating')
    .isInt({ max: 5, min: 1 })
    .withMessage("Property 'rating' should exist and be between 1 and 5 "),
];
