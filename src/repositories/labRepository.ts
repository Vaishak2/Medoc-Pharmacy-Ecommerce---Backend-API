import LabRequest from '../models/labRequest';

const getAllLabRequests = async () => {
  return LabRequest.findAll();
};

const createLabRequest = async (labRequestData: any) => {
  return LabRequest.create(labRequestData);
};

export default { getAllLabRequests, createLabRequest };

