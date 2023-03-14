import { Router } from 'express';
import * as ExamController from './exam.controller';

export const examRouter = Router();

examRouter.get('/:examId', ExamController.getExam);

examRouter.patch('/:examId', ExamController.updateExam);

examRouter.delete('/:examId', ExamController.deleteExam);
