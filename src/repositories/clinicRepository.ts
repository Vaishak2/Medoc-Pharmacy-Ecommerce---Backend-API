import Clinic from '../models/clinic';

const getAllClinics = async () => {
  return Clinic.findAll();
};

const createClinic = async (clinicData: any) => {
  return Clinic.create(clinicData);
};

export default { getAllClinics, createClinic };

