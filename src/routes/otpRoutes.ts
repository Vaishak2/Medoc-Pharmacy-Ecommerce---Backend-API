import { Router } from 'express';
import { sendOTP, verifyOTP } from '../controllers/otpController';

const router = Router();

router.post('/login/send-otp', sendOTP);
router.post('/login/verify-otp', verifyOTP);

export default router;
