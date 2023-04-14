import { Router } from 'express';
import * as ConditionController from './condition.controller';

export const patientConditionRouter = Router({ mergeParams: true });

patientConditionRouter.get('/', ConditionController.getPatientCondition);
