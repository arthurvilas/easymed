import { RequestHandler } from 'express';
import * as ConditionService from './condition.service';

export const getPatientCondition: RequestHandler = async (req, res) => {
  try {
    const patientId = parseInt(req.params.patientId, 10);
    const conditions = await ConditionService.getPatientConditions(patientId);
    return res.status(200).json(conditions);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export const createCondition: RequestHandler = async (req, res) => {
  try {
    const appointmentId = parseInt(req.params.appointmentId, 10);
    const createdCondition = await ConditionService.createCondition({
      appointment: { connect: { id: appointmentId } },
      ...req.body,
    });
    return res.status(201).json(createdCondition);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export const updateCondition: RequestHandler = async (req, res) => {
  try {
    const conditionId = parseInt(req.params.conditionId, 10);
    const updatedCondition = await ConditionService.updateCondition(
      conditionId,
      req.body
    );
    return res.status(200).json(updatedCondition);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

export const deleteCondition: RequestHandler = async (req, res) => {
  try {
    const conditionId = parseInt(req.params.conditionId, 10);
    const deletedCondition = await ConditionService.deleteCondition(
      conditionId
    );
    return res.status(200).json(deletedCondition);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ error });
  }
};
