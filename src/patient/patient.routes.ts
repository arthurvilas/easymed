import { Router } from 'express';
import { patientAllergyRouter } from '../allergy/patientAllergy.routes';
import { patientMedicineRouter } from '../medicine/patientMedicine.routes';
import * as PatientController from './patient.controller';

export const patientRouter = Router();

patientRouter.get('/', PatientController.listPatients);

patientRouter.get('/:id', PatientController.getPatient);

patientRouter.post('/', PatientController.createPatient);

patientRouter.patch('/:id', PatientController.updatePatient);

patientRouter.delete('/:id', PatientController.deletePatient);

patientRouter.use('/:patientId/allergies', patientAllergyRouter);

patientRouter.use('/:patientId/medicines', patientMedicineRouter);
