import { RequestHandler } from 'express';
import * as MedicineService from './medicine.service';

// List all medicines
export const listMedicines: RequestHandler = async (req, res) => {
  try {
    const medicines = await MedicineService.listMedicines();
    return res.status(200).json(medicines);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};

// List all medicines for a patient
export const getPatientMedicines: RequestHandler = async (req, res) => {
  try {
    const patientId = parseInt(req.params.patientId, 10);
    const patientMedicines = await MedicineService.getPatientMedicines(
      patientId
    );
    return res.status(200).json(patientMedicines);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};

// Relates a medicine to a patient
export const createPatientMedicine: RequestHandler = async (req, res) => {
  try {
    const patientId = parseInt(req.params.patientId, 10);
    const medicineId = parseInt(req.params.medicineId, 10);
    const createdPatientMedicine = await MedicineService.createPatientMedicine({
      patient: { connect: { id: patientId } },
      medicine: { connect: { id: medicineId } },
      ...req.body,
    });
    return res.status(201).json(createdPatientMedicine);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};

// Updates a relation between a medicine and a patient
export const updatePatientMedicine: RequestHandler = async (req, res) => {
  try {
    const patientId = parseInt(req.params.patientId, 10);
    const medicineId = parseInt(req.params.medicineId, 10);
    const updatedPatientMedicine = await MedicineService.updatePatientMedicine(
      patientId,
      medicineId,
      req.body
    );
    return res.status(200).json(updatedPatientMedicine);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};

// Deletes a relation between patient and medicine
export const deletePatientMedicine: RequestHandler = async (req, res) => {
  try {
    const patientId = parseInt(req.params.patientId, 10);
    const medicineId = parseInt(req.params.medicineId, 10);
    const deletedPatientMedicine = await MedicineService.deletePatientMedicine(
      patientId,
      medicineId
    );
    return res.status(200).json(deletedPatientMedicine);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};
