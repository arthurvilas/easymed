import { Router } from 'express';
import * as MedicineController from './medicine.controller';

export const patientMedicineRouter = Router({ mergeParams: true });

patientMedicineRouter.get('/', MedicineController.getPatientMedicines);

patientMedicineRouter.post(
  '/:medicineId',
  MedicineController.createPatientMedicine
);

patientMedicineRouter.patch(
  '/:medicineId',
  MedicineController.updatePatientMedicine
);

patientMedicineRouter.delete(
  '/:medicineId',
  MedicineController.deletePatientMedicine
);
