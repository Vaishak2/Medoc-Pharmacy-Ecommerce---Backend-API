import { Router } from 'express';
import appointmentController from '../controllers/appointmentController';

const router = Router();

router.get('/', appointmentController.getAllAppointments);
router.post('/', appointmentController.createAppointment);

export default router;

