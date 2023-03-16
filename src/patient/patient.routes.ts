import { Router } from 'express';
import { patientAllergyRouter } from '../allergy/patientAllergy.routes';
import { patientAppointmentRouter } from '../appointments/patientAppointment.routes';
import { patientConditionRouter } from '../condition/patientCondition.routes';
import { patientMedicineRouter } from '../medicine/patientMedicine.routes';
import { ratingRouter } from '../rating/rating.routers';
import * as PatientController from './patient.controller';
import {
  createPatientValidator,
  deletePatientValidator,
  getPatientValidator,
  updatePatientValidator,
} from './patientValidators';

export const patientRouter = Router();

patientRouter.get('/', PatientController.listPatients);

patientRouter.get(
  '/:patientId',
  getPatientValidator,
  PatientController.getPatient
);

patientRouter.post(
  '/',
  createPatientValidator,
  PatientController.createPatient
);

patientRouter.patch(
  '/:patientId',
  updatePatientValidator,
  PatientController.updatePatient
);

patientRouter.delete(
  '/:patientId',
  deletePatientValidator,
  PatientController.deletePatient
);

patientRouter.use('/:patientId/allergies', patientAllergyRouter);

patientRouter.use('/:patientId/medicines', patientMedicineRouter);

patientRouter.use('/:patientId/doctors/:doctorId/ratings', ratingRouter);

patientRouter.use(
  ['/:patientId/appointments', '/:patientId/doctors/:doctorId/appointments'],
  patientAppointmentRouter
);

patientRouter.use('/:patientId/conditions', patientConditionRouter);
