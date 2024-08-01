import { getRepository } from 'typeorm';
import { Notification } from '../models/notificationModel';
import { User } from '../models/user';

export const createNotification = async (userId: number, title: string, message: string) => {
  const notificationRepository = getRepository(Notification);
  const userRepository = getRepository(User);
  
  const user = await userRepository.findOne({ where: { id: userId } });
  
  if (!user) {
    throw new Error('User not found');
  }

  const newNotification = notificationRepository.create({
    user,
    title,
    message,
    isRead: false,
  });

  await notificationRepository.save(newNotification);
  return newNotification;
};
