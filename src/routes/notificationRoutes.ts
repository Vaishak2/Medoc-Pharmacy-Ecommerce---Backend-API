import { Router } from 'express';
import { postNotification, getNotifications, markAsRead, deleteNotificationById } from '../controllers/notificationController';
import authMiddleware from '../middlewares/authMiddleware'

const router = Router();

router.post('/notifications', postNotification);
router.get('/notifications/:userId', getNotifications);
router.put('/notifications/:notificationId/read', markAsRead);
router.delete('/notifications/:notificationId', deleteNotificationById);

export default router;
