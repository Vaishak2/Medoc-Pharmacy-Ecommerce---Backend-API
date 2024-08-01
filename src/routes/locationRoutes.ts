import { Router } from 'express';
import { getLocations, addLocation } from '../controllers/locationController';

const router = Router();

router.get('/locations', getLocations);
router.post('/locations',addLocation);

export default router;
