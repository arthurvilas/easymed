import { RequestHandler } from 'express';
import * as PatientService from './patient.service';

// List all patients
export const listPatients: RequestHandler = async (req, res) => {
  try {
    const patients = await PatientService.listPatients();
    return res.status(200).json(patients);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};

// Find a single patient
export const getPatient: RequestHandler = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const patient = await PatientService.getPatient(id);
    if (!patient) {
      return res.status(404).json(`No Patient with id ${id}`);
    }
    return res.status(200).json(patient);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};

// Create a patient
export const createPatient: RequestHandler = async (req, res) => {
  try {
    const createdPatient = await PatientService.createPatient(req.body);
    return res.status(201).json(createdPatient);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};

// Update a patient
export const updatePatient: RequestHandler = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const updatedUser = await PatientService.updatePatient(id, req.body);
    return res.status(200).json(updatedUser);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};

// Delete a patient
export const deletePatient: RequestHandler = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const deletedUser = await PatientService.deletePatient(id);
    return res.status(200).json(deletedUser);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};
