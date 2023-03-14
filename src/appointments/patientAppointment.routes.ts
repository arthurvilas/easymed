import { Router } from 'express';
import * as AppointmentController from './appointment.controller';

export const patientAppointmentRouter = Router({ mergeParams: true });

patientAppointmentRouter.get('/', AppointmentController.getPatientAppointments);

patientAppointmentRouter.post('/', AppointmentController.createAppointment);
