import Appointment from '../models/appointment';

const getAllAppointments = async () => {
  return Appointment.findAll();
};

const createAppointment = async (appointmentData: any) => {
  return Appointment.create(appointmentData);
};

export default { getAllAppointments, createAppointment };

