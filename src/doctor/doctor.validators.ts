import { body, checkExact, param } from 'express-validator';

export const createSpecialtyValidator = checkExact([body('name').notEmpty()]);

export const getDoctorValidator = checkExact([param('doctorId').isNumeric()]);

export const createDoctorValidator = checkExact([
  body('name').notEmpty().trim().isLength({ max: 50 }),
  body('email').notEmpty().isEmail().normalizeEmail(),
  body('cpf').notEmpty().isNumeric().isLength({ max: 11, min: 11 }),
  body('password').notEmpty(),
  body('specialty').isNumeric(),
  body('profilePicture').optional().isURL(),
  body('phone').optional().isString().isLength({ min: 8, max: 20 }),
  body('description').optional().notEmpty(),
  body('insurance').optional(),
]);


