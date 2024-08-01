import { Router } from 'express';
import labController from '../controllers/labController';

const router = Router();

router.get('/', labController.getAllLabRequests);
router.post('/', labController.createLabRequest);

export default router;

