import { RequestHandler } from 'express';
import { exclude } from '../utils/excludeFields';
import * as DoctorService from './doctor.service';

// List all doctors
export const listDoctors: RequestHandler = async (req, res) => {
  try {
    const specialtyId = parseInt(req.query.specialty as string, 10);
    const doctors = await DoctorService.listDoctors(specialtyId);
    const doctorsWithoutPasswords = doctors.map((doctor) =>
      exclude(doctor, ['password'])
    );
    return res.status(200).json(doctorsWithoutPasswords);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};

// List all specialties
export const listSpecialties: RequestHandler = async (req, res) => {
  try {
    const specialties = await DoctorService.listSpecialties();
    return res.status(200).json(specialties);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};

// Find a single doctor
export const getDoctor: RequestHandler = async (req, res) => {
  try {
    const id = parseInt(req.params.doctorId, 10);
    const doctor = await DoctorService.getDoctor(id);
    if (!doctor) {
      return res.status(404).json(`No Doctor with id ${id}`);
    }
    return res.status(200).json(exclude(doctor, ['password']));
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};

// Create a doctor
export const createDoctor: RequestHandler = async (req, res) => {
  try {
    const createdDoctor = await DoctorService.createDoctor(req.body);
    return res.status(201).json(exclude(createdDoctor, ['password']));
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};

// Update a doctor
export const updateDoctor: RequestHandler = async (req, res) => {
  try {
    const id = parseInt(req.params.doctorId, 10);
    const updatedDoctor = await DoctorService.updateDoctor(id, req.body);
    return res.status(200).json(exclude(updatedDoctor, ['password']));
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};

// Delete a doctor
export const deleteDoctor: RequestHandler = async (req, res) => {
  try {
    const id = parseInt(req.params.doctorId, 10);
    const deletedUser = await DoctorService.deleteDoctor(id);
    return res.status(200).json(exclude(deletedUser, ['password']));
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};
