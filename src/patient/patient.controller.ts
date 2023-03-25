import { RequestHandler } from 'express';
import { exclude } from '../utils/excludeFields';
import { validationResult } from 'express-validator';
import * as PatientService from './patient.service';
import jwt from 'jsonwebtoken';

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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const id = parseInt(req.params.patientId, 10);
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const createdPatient = await PatientService.createPatient(req.body);
    const token = jwt.sign(
      {
        id: createdPatient.id,
        name: createdPatient.name,
        email: createdPatient.email,
        role: 'patient',
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '2 days' }
    );
    return res
      .status(201)
      .json({ patient: exclude(createdPatient, ['password']), token });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

// Update a patient
export const updatePatient: RequestHandler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const id = parseInt(req.params.patientId, 10);
    const updatedPatient = await PatientService.updatePatient(id, req.body);
    return res.status(200).json(exclude(updatedPatient, ['password']));
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};

// Delete a patient
export const deletePatient: RequestHandler = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const id = parseInt(req.params.patientId, 10);
    const deletedPatient = await PatientService.deletePatient(id);
    return res.status(200).json(exclude(deletedPatient, ['password']));
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};
