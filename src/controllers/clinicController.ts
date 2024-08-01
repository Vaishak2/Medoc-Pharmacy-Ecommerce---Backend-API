import { Request, Response } from 'express';
import clinicService from '../services/clinicService';

const getAllClinics = async (req: Request, res: Response) => {
  const clinics = await clinicService.getAllClinics();
  res.json(clinics);
};

const createClinic = async (req: Request, res: Response) => {
  const { name, location } = req.body;
  const clinic = await clinicService.createClinic(name, location);
  res.json(clinic);
};

export default { getAllClinics, createClinic };

