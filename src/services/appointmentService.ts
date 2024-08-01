import appointmentRepository from '../repositories/appointmentRepository';

const getAllAppointments = async () => {
  return appointmentRepository.getAllAppointments();
};

const createAppointment = async (patientId: string, doctorId: string, date: Date) => {
  return appointmentRepository.createAppointment({ patientId, doctorId, date });
};

export default { getAllAppointments, createAppointment };
 
