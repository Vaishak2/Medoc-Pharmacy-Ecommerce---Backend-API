import { Router } from 'express';
import clinicController from '../controllers/clinicController';

const router = Router();

router.get('/', clinicController.getAllClinics);
router.post('/', clinicController.createClinic);

export default router;

