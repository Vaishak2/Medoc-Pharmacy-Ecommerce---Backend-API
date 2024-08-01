import { Request, Response } from 'express';
import labService from '../services/labService';

const getAllLabRequests = async (req: Request, res: Response) => {
  const labRequests = await labService.getAllLabRequests();
  res.json(labRequests);
};

const createLabRequest = async (req: Request, res: Response) => {
  const { patientId, testId, date } = req.body;
  const labRequest = await labService.createLabRequest(patientId, testId, date);
  res.json(labRequest);
};

export default { getAllLabRequests, createLabRequest };

