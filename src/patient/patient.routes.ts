import { Router } from 'express';
import * as PatientController from './patient.controller';

export const patientRouter = Router();

patientRouter.get('/', PatientController.listPatients);

patientRouter.get('/:id', PatientController.getPatient);

patientRouter.post('/', PatientController.createPatient);

patientRouter.patch('/:id', PatientController.updatePatient);

patientRouter.delete('/:id', PatientController.deletePatient);
