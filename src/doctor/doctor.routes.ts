import { Router } from 'express';
import { ratingRouter } from '../rating/rating.routers';
import * as DoctorController from './doctor.controller';

export const doctorRouter = Router();

doctorRouter.get('/', DoctorController.listDoctors);

doctorRouter.get('/:id', DoctorController.getDoctor);

doctorRouter.get('/specialties', DoctorController.listSpecialties);

doctorRouter.post('/', DoctorController.createDoctor);

doctorRouter.patch('/:id', DoctorController.updateDoctor);

doctorRouter.delete('/', DoctorController.deleteDoctor);

doctorRouter.use('/:doctorId/ratings', ratingRouter);
