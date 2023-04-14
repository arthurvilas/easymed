import { Router } from 'express';
import * as ConditionController from './condition.controller';
export const appointmentConditionRouter = Router({ mergeParams: true });

appointmentConditionRouter.post('/', ConditionController.createCondition);
