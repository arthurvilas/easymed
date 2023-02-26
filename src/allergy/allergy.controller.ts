import { RequestHandler } from 'express';
import * as AllergyService from './allergy.service';

// List all allergies
export const listAllergies: RequestHandler = async (req, res) => {
  try {
    const allergies = await AllergyService.listAllergies();
    return res.status(200).json(allergies);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};

// List all allergies for a patient
export const getPatientAllergies: RequestHandler = async (req, res) => {
  try {
    const patientId = parseInt(req.params.patientId, 10);
    const patientAllergies = await AllergyService.getPatientAllergies(
      patientId
    );
    return res.status(200).json(patientAllergies);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};

// Relates an allergy to a patient
export const createPatientAllergy: RequestHandler = async (req, res) => {
  const patientId = parseInt(req.params.patientId, 10);
  const allergyId = parseInt(req.params.allergyId, 10);
  try {
    const createdPatientAllergy = await AllergyService.createPatientAllergy({
      patient: { connect: { id: patientId } },
      allergy: { connect: { id: allergyId } },
      ...req.body,
    });
    return res.status(201).json(createdPatientAllergy);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};

// Delets a relation between allergy and patient
export const deletePatientAllergy: RequestHandler = async (req, res) => {
  const patientId = parseInt(req.params.patientId, 10);
  const allergyId = parseInt(req.params.allergyId, 10);
  try {
    const deletedPatientAllergy = await AllergyService.deletePatientAllergy(
      patientId,
      allergyId
    );
    return res.status(200).json(deletedPatientAllergy);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};
