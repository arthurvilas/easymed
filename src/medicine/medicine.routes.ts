import { Router } from 'express';
import * as MedicineController from './medicine.controller';

export const medicineRouter = Router();

medicineRouter.get('/', MedicineController.listMedicines);
