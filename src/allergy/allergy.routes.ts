import { Router } from 'express';
import * as AllergyController from './allergy.controller';
export const allergyRouter = Router();

allergyRouter.get('/', AllergyController.listAllergies);
