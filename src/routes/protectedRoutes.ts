import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware';

const router = Router();

router.use(authMiddleware);

router.get('/protected', (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

export default router;
