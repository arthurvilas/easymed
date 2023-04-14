import { Router } from 'express';
import * as ConditionController from './condition.controller';

export const conditionRouter = Router();

conditionRouter.patch('/:conditionId', ConditionController.updateCondition);

conditionRouter.delete('/:conditionId', ConditionController.deleteCondition);
