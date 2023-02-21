import { Router } from 'express';
import * as DoctorController from './doctor.controller';

export const doctorRouter = Router();

doctorRouter.get('/', DoctorController.listDoctors);

doctorRouter.get('/:id', DoctorController.getDoctor);

doctorRouter.post('/', DoctorController.createDoctor);

doctorRouter.patch('/:id', DoctorController.updateDoctor);

doctorRouter.delete('/', DoctorController.deleteDoctor);