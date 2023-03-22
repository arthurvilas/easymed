import { Router } from 'express';
import { doctorAppointmentRouter } from '../appointments/doctorAppointment.routes';
import { ratingRouter } from '../rating/rating.routers';
import * as DoctorController from './doctor.controller';

export const doctorRouter = Router();

doctorRouter.get('/', DoctorController.listDoctors);

doctorRouter.get('/specialties', DoctorController.listSpecialties);

doctorRouter.get('/:doctorId', DoctorController.getDoctor);

doctorRouter.post('/', DoctorController.createDoctor);

doctorRouter.patch('/:doctorId', DoctorController.updateDoctor);

doctorRouter.delete('/:doctorId', DoctorController.deleteDoctor);

doctorRouter.use('/:doctorId/ratings', ratingRouter);

doctorRouter.use('/:doctorId/appointments', doctorAppointmentRouter);
