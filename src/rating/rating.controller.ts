import { RequestHandler } from 'express';
import * as RatingService from './rating.service';

// Get ratings for a doctor
export const getDoctorRatings: RequestHandler = async (req, res) => {
  try {
    const doctorId = parseInt(req.params.doctorId, 10);
    const doctorRatings = await RatingService.getDoctorRatings(doctorId);
    return res.status(200).json(doctorRatings);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

// Create rating for a doctor
export const createRating: RequestHandler = async (req, res) => {
  try {
    const patientId = parseInt(req.params.patientId, 10);
    const doctorId = parseInt(req.params.doctorId, 10);
    const createdRating = await RatingService.createRating({
      ...req.body,
      patient: { connect: { id: patientId } },
      doctor: { connect: { id: doctorId } },
    });
    return res.status(201).json(createdRating);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};
