import { Router } from 'express';
import authRoutes from './authRoutes';
import productRoutes from './productRoutes';
import userRoutes from './userRoutes';
import clinicRoutes from './clinicRoutes';
import appointmentRoutes from './appointmentRoutes';
import labRoutes from './labRoutes';


const router = Router();

router.use('/auth', authRoutes);
router.use('/products', productRoutes);
router.use('/users', userRoutes);
router.use('/clinics', clinicRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/labs', labRoutes);


export default router;
