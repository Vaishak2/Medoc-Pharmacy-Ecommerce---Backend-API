import { Request, Response } from 'express';
import { createNotification, getNotificationsByUserId, markNotificationAsRead, deleteNotification } from '../repositories/notificationRepository';
import Notification from '../models/notificationModel';
import { getRepository } from 'typeorm';

export const postNotification = async (req: Request, res: Response) => {
  const { userId, title, message } = req.body;

  try {
    const newNotification = await createNotification(Number(userId), title, message);
    res.status(201).json({
      message: "Notification created successfully",
      data: newNotification
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating notification",
      error: (error as Error).message
    });
  }
};
// -------------------------------------------------------------------------------------------------------------
// export const getNotifications = async (req: Request, res: Response) => {
//   const { userId } = req.params;

//   try {
//     const notifications = await getNotificationsByUserId(Number(userId));
//     res.status(200).json({
//       message: "Notifications fetched successfully",
//       data: {notifications}
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Error fetching notifications",
//       error: (error as Error).message
//     });
//   }
// };

// -------------------------------------------------------------------------------------------------------------
export const getNotifications = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const notificationRepository = getRepository(Notification);
    const notifications = await notificationRepository.find({ where: { user: { id: Number(userId) } } });
    res.status(200).json({ message: 'Success', data: {notifications}});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications', error });
  }
};

// -------------------------------------------------------------------------------------------------------------
export const markAsRead = async (req: Request, res: Response) => {
  const { notificationId } = req.params;

  try {
    const updatedNotification = await markNotificationAsRead(Number(notificationId));
    res.status(200).json({
      message: "Notification marked as read",
      data: {updatedNotification}
    });
  } catch (error) {
    res.status(500).json({
      message: "Error marking notification as read",
      error: (error as Error).message
    });
  }
};
// -------------------------------------------------------------------------------------------------------------
export const deleteNotificationById = async (req: Request, res: Response) => {
  const { notificationId } = req.params;

  try {
    await deleteNotification(Number(notificationId));
    res.status(200).json({
      message: "Notification deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting notification",
      error: (error as Error).message
    });
  }
};
