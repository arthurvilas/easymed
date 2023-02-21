import { RequestHandler } from 'express';
import * as DoctorService from './doctor.service';

// List all doctors
export const listDoctors: RequestHandler = async (req, res) => {
  try {
    const specialtyId = parseInt(req.query.specialty as string, 10);
    const doctors = await DoctorService.listDoctors(specialtyId);
    return res.status(200).json(doctors);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};

// Find a single doctor
export const getDoctor: RequestHandler = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const doctor = await DoctorService.getDoctor(id);
    return res.status(200).json(doctor);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};

// Create a doctor
export const createDoctor: RequestHandler = async (req, res) => {
  try {
    const createdDoctor = await DoctorService.createDoctor(req.body);
    return res.status(201).json(createdDoctor);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};

// Update a doctor
export const updateDoctor: RequestHandler = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const updatedDoctor = await DoctorService.updateDoctor(id, req.body);
    return res.status(200).json(updatedDoctor);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};

// Delete a doctor
export const deleteDoctor: RequestHandler = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const deletedUser = await DoctorService.deleteDoctor(id);
    return res.status(200).json(deletedUser);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};
