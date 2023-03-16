import { body, param } from 'express-validator';

export const getPatientValidator = [param('patientId').isNumeric()];

export const createPatientValidator = [
  body('name').notEmpty().trim().isLength({ max: 50 }),
  body('cpf').notEmpty().isNumeric().isLength({ max: 11, min: 11 }),
  body('email').notEmpty().isEmail().normalizeEmail(),
  body('password').notEmpty().isString().isLength({ min: 4, max: 20 }),
  body('birthDate').optional().isISO8601(),
  body('profilePicture').optional().isURL(),
  body('height').optional().isDecimal(),
  body('gender').optional().isString().isAlpha(),
];

export const updatePatientValidator = [
  param('patientId').isNumeric(),
  body('name').optional().notEmpty().trim().isLength({ max: 50 }),
  body('cpf').optional().notEmpty().isNumeric().isLength({ max: 11, min: 11 }),
  body('email').optional().notEmpty().isEmail().normalizeEmail(),
  body('password')
    .optional()
    .notEmpty()
    .isString()
    .isLength({ min: 4, max: 20 }),
  body('birthDate').optional().isISO8601(),
  body('profilePicture').optional().isURL(),
  body('height').optional().isDecimal(),
  body('gender').optional().isString().isAlpha(),
];

export const deletePatientValidator = [param('patientId').isNumeric()];
