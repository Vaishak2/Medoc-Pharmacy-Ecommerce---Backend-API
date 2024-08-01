import clinicRepository from '../repositories/clinicRepository';

const getAllClinics = async () => {
  return clinicRepository.getAllClinics();
};

const createClinic = async (name: string, location: string) => {
  return clinicRepository.createClinic({ name, location });
};

export default { getAllClinics, createClinic };

