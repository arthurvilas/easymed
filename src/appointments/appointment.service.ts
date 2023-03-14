import { Prisma, TimeSlots } from '@prisma/client';
import { db } from '../utils/db.server';

const timeSlots = Object.values(TimeSlots);

export const getAppointment = async (appointmentId: number) => {
  return db.appointment.findUnique({
    where: { id: appointmentId },
  });
};

export const getPatientAppointments = async (patientId: number) => {
  return db.appointment.findMany({ where: { patientId: patientId } });
};

export const getDoctorFreeSlotsForDate = async (
  doctorId: number,
  date: string
) => {
  const scheduledAppointments = await db.appointment.findMany({
    where: { doctorId, date: new Date(date) },
    select: { time: true },
  });

  const scheduledAppointmentsTimeSlots = scheduledAppointments.map(
    (appointment) => appointment.time
  );

  return {
    date: date,
    freeTimeSlots: timeSlots.filter(
      (ts) => !scheduledAppointmentsTimeSlots.includes(ts)
    ),
  };
};

export const createAppointment = async (
  appointmentData: Prisma.AppointmentCreateInput
) => {
  return db.appointment.create({
    data: appointmentData,
    include: { patient: true, doctor: true },
  });
};

export const updateAppointment = async (
  appointmentId: number,
  appointmentData: Prisma.AppointmentUpdateInput
) => {
  return db.appointment.update({
    where: { id: appointmentId },
    data: appointmentData,
  });
};

export const deleteAppointment = async (appointmentId: number) => {
  return db.appointment.delete({
    where: { id: appointmentId },
  });
};
