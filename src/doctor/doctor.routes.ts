import { Router } from 'express';
import { doctorAppointmentRouter } from '../appointments/doctorAppointment.routes';
import { doctorRatingRouter } from '../rating/doctorRating.routes';
import * as DoctorController from './doctor.controller';

export const doctorRouter = Router();

doctorRouter.get('/', DoctorController.listDoctors);

doctorRouter.get('/specialties', DoctorController.listSpecialties);

doctorRouter.post('/specialties', DoctorController.createSpecialty);

doctorRouter.get('/:doctorId', DoctorController.getDoctor);

doctorRouter.post('/', DoctorController.createDoctor);

doctorRouter.patch('/:doctorId', DoctorController.updateDoctor);

doctorRouter.delete('/:doctorId', DoctorController.deleteDoctor);

doctorRouter.use('/:doctorId/ratings', doctorRatingRouter);

doctorRouter.use('/:doctorId/appointments', doctorAppointmentRouter);
