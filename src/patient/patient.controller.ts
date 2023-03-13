import { RequestHandler } from 'express';
import { exclude } from '../utils/excludeFields';
import * as PatientService from './patient.service';
import * as AuthService from '../auth/auth.service';

// List all patients
export const listPatients: RequestHandler = async (req, res) => {
  try {
    const patients = await PatientService.listPatients();
    const patientsWithoutPassword = patients.map((patient) =>
      exclude(patient, ['password'])
    );
    return res.status(200).json(patientsWithoutPassword);
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
    return res.status(200).json(exclude(patient, ['password']));
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};

// Create a patient
export const createPatient: RequestHandler = async (req, res) => {
  try {
    const createdPatient = await PatientService.createPatient(req.body);
    const patientWithToken = await AuthService.login({
      email: createdPatient.email,
      password: createdPatient.password,
    });
    return res.status(201).json({
      ...patientWithToken,
      patient: exclude(patientWithToken.patient, ['password']),
    });
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};

// Update a patient
export const updatePatient: RequestHandler = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const updatedPatient = await PatientService.updatePatient(id, req.body);
    return res.status(200).json(exclude(updatedPatient, ['password']));
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};

// Delete a patient
export const deletePatient: RequestHandler = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const deletedPatient = await PatientService.deletePatient(id);
    return res.status(200).json(exclude(deletedPatient, ['password']));
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};
