import { Request, Response } from 'express';
import appointmentService from '../services/appointmentService';

const getAllAppointments = async (req: Request, res: Response) => {
  const appointments = await appointmentService.getAllAppointments();
  res.json(appointments);
};

const createAppointment = async (req: Request, res: Response) => {
  const { patientId, doctorId, date } = req.body;
  const appointment = await appointmentService.createAppointment(patientId, doctorId, date);
  res.json(appointment);
};

export default { getAllAppointments, createAppointment };

