import labRepository from '../repositories/labRepository';

const getAllLabRequests = async () => {
  return labRepository.getAllLabRequests();
};

const createLabRequest = async (patientId: string, testId: string, date: Date) => {
  return labRepository.createLabRequest({ patientId, testId, date });
};

export default { getAllLabRequests, createLabRequest };

