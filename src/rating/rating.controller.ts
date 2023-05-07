import { RequestHandler } from 'express';
import * as RatingService from './rating.service';

// Get a specific rating
export const getRating: RequestHandler = async (req, res) => {
  try {
    const patientId = parseInt(req.params.patientId, 10);
    const doctorId = parseInt(req.params.doctorId, 10);
    const rating = await RatingService.getRating(patientId, doctorId);
    if (!rating) {
      return res.status(404).json('Rating not found');
    }
    return res.status(200).json(rating);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};

// Update a rating
export const updateRating: RequestHandler = async (req, res) => {
  try {
    const patientId = parseInt(req.params.patientId, 10);
    const doctorId = parseInt(req.params.doctorId, 10);
    const { rating } = req.body;
    const updatedRating = await RatingService.updateRating(
      patientId,
      doctorId,
      {
        rating,
      }
    );
    return res.status(200).json(updatedRating);
  } catch (error: any) {
    return res.status(500).json(error.message);
  }
};

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
