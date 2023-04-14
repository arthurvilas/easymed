import { Router } from 'express';
import * as AllergyController from './allergy.controller';
export const patientAllergyRouter = Router({ mergeParams: true });

patientAllergyRouter.get('/', AllergyController.getPatientAllergies);

patientAllergyRouter.post(
  '/:allergyId',
  AllergyController.createPatientAllergy
);

patientAllergyRouter.delete(
  '/:allergyId',
  AllergyController.deletePatientAllergy
);
