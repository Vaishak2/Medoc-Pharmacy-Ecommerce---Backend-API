import { getRepository } from 'typeorm';
import { Notification } from '../models/notificationModel';

export const createNotification = async (userId: number, title: string, message: string) => {
  const notificationRepository = getRepository(Notification);
  const notification = notificationRepository.create({ user: { id: userId }, title, message });
  return await notificationRepository.save(notification);
};

export const getNotificationsByUserId = async (userId: number) => {
  const notificationRepository = getRepository(Notification);
  return await notificationRepository.find({ where: { user: { id: userId } } });
};

export const markNotificationAsRead = async (notificationId: number) => {
  const notificationRepository = getRepository(Notification);
  const notification = await notificationRepository.findOne({ where: { id: notificationId } });
  if (notification) {
    notification.isRead = true;
    return await notificationRepository.save(notification);
  } else {
    throw new Error('Notification not found');
  }
};

export const deleteNotification = async (notificationId: number) => {
  const notificationRepository = getRepository(Notification);
  return await notificationRepository.delete(notificationId);
};
