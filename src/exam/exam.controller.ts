import { RequestHandler } from 'express';
import * as ExamService from './exam.service';

// Get appointments exam
export const getAppointmentExams: RequestHandler = async (req, res) => {
  try {
    const appointmentId = parseInt(req.params.appointmentId, 10);
    const exams = await ExamService.getAppointmentExams(appointmentId);
    return res.status(200).json(exams);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

// Get an exam
export const getExam: RequestHandler = async (req, res) => {
  try {
    const examId = parseInt(req.params.examId, 10);
    const exam = await ExamService.getExam(examId);
    if (!exam) {
      return res.status(404).json('No exam with id ' + examId);
    }
    return res.status(200).json(exam);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

// Creates an exam
export const createExam: RequestHandler = async (req, res) => {
  try {
    const appointmentId = parseInt(req.params.appointmentId, 10);
    const createdExam = await ExamService.createExam({
      ...req.body,
      appointment: { connect: { id: appointmentId } },
    });
    return res.status(201).json(createdExam);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

export const updateExam: RequestHandler = async (req, res) => {
  try {
    const examId = parseInt(req.params.examId, 10);
    const updatedExam = await ExamService.updateExam(examId, req.body);
    return res.status(200).json(updatedExam);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};

// Deletes an exam
export const deleteExam: RequestHandler = async (req, res) => {
  try {
    const examId = parseInt(req.params.examId, 10);
    const deletedExam = await ExamService.deleteExam(examId);
    return res.status(200).json(deletedExam);
  } catch (error: any) {
    console.log(error);
    return res.status(500).json(error.message);
  }
};
