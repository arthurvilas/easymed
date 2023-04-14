import { Router } from 'express';
import * as AppointmentController from './appointment.controller';

export const doctorAppointmentRouter = Router({ mergeParams: true });

doctorAppointmentRouter.get('/', AppointmentController.getDoctorFreeSlots);
