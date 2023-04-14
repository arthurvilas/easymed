import { Router } from 'express';
import { appointmentConditionRouter } from '../condition/appointmentCondition.routes';
import { appointmentExamRouter } from '../exam/appointmentExam.routes';
import * as AppointmentController from './appointment.controller';

export const appointmentRouter = Router();

appointmentRouter.get('/:appointmentId', AppointmentController.getAppointment);

appointmentRouter.patch(
  '/:appointmentId',
  AppointmentController.updateAppointment
);

appointmentRouter.delete(
  '/:appointmentId',
  AppointmentController.deleteAppointment
);

appointmentRouter.use('/:appointmentId/exams', appointmentExamRouter);

appointmentRouter.use('/:appointmentId/conditions', appointmentConditionRouter);
