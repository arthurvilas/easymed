import { RequestHandler } from 'express';
import { getDatesBetween } from '../utils/dateTimeHelpers';
import { exclude } from '../utils/excludeFields';
import * as AppointmentService from './appointment.service';

// Returns data about a specific appointment
export const getAppointment: RequestHandler = async (req, res) => {
  try {
    const appointmentId = parseInt(req.params.appointmentId, 10);
    const appointment = await AppointmentService.getAppointment(appointmentId);
    if (!appointment) {
      throw new Error('No appointment with id ' + appointmentId);
    }
    return res.status(200).json(appointment);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

// Returns all appointments for a patient
export const getPatientAppointments: RequestHandler = async (req, res) => {
  try {
    const patientId = parseInt(req.params.patientId, 10);
    const appointments = await AppointmentService.getPatientAppointments(
      patientId
    );
    return res.status(200).json(appointments);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

// Returns all free time slots appointments for a doctor
export const getDoctorFreeSlots: RequestHandler = async (req, res) => {
  try {
    const doctorId = parseInt(req.params.doctorId, 10);
    const { startDate, endDate } = req.query;

    const datesBetween = getDatesBetween(
      new Date(startDate as string),
      new Date(endDate as string)
    );

    const isoDatesBetween = datesBetween.map((date) => date.toISOString());

    const freeSlotsInInterval = await Promise.all(
      isoDatesBetween.map((date) =>
        AppointmentService.getDoctorFreeSlotsForDate(doctorId, date)
      )
    );

    return res.status(200).json(freeSlotsInInterval);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

// Creates an appointment
export const createAppointment: RequestHandler = async (req, res) => {
  try {
    const patientId = parseInt(req.params.patientId, 10);
    const doctorId = parseInt(req.params.doctorId, 10);
    const createdAppointment = await AppointmentService.createAppointment({
      ...req.body,
      date: new Date(req.body.date),
      patient: { connect: { id: patientId } },
      doctor: { connect: { id: doctorId } },
    });
    return res.status(200).json({
      ...createdAppointment,
      patient: exclude(createdAppointment.patient, ['password']),
      doctor: exclude(createdAppointment.doctor, ['password']),
    });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

// Updates an appointment
export const updateAppointment: RequestHandler = async (req, res) => {
  try {
    const appointmentId = parseInt(req.params.appointmentId, 10);
    const updatedAppointment = await AppointmentService.updateAppointment(
      appointmentId,
      req.body
    );
    return res.status(200).json(updatedAppointment);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

// Deletes an appointment
export const deleteAppointment: RequestHandler = async (req, res) => {
  try {
    const appointmentId = parseInt(req.params.appointmentId, 10);
    const deletedAppointment = await AppointmentService.deleteAppointment(
      appointmentId
    );
    return res.status(200).json(deletedAppointment);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};
