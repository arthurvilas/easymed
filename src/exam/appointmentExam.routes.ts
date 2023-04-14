import { Router } from 'express';
import * as ExamController from './exam.controller';

export const appointmentExamRouter = Router({ mergeParams: true });

appointmentExamRouter.get('/', ExamController.getAppointmentExams);

appointmentExamRouter.post('/', ExamController.createExam);
