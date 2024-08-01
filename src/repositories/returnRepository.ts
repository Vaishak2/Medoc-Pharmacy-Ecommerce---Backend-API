import { getRepository } from 'typeorm';
import { Return } from '../models/order_return';
import { Order } from '../models/orderModel';
import { Product } from '../models/product';
import { User } from '../models/user';
import { Carts } from '../models/cart';

export const getReturnsByOrderId = async (orderId: number) => {
  const returnRepository = getRepository(Return);

  try {
    const returns = await returnRepository.createQueryBuilder('returns')
      .leftJoinAndSelect('returns.order', 'order')
      .leftJoinAndSelect('order.product', 'product')
      .leftJoinAndSelect('order.user', 'user')
      .leftJoinAndSelect('order.carts', 'cart')
      .where('order.id = :orderId', { orderId })
      .getMany();

    return returns.map(ret => ({
      return_id: ret.id,
      return_date: ret.return_date,
      return_amount: ret.return_amount,
      purchased_amount: ret.purchased_amount,
      return_reason: ret.return_reason,
      comments: ret.comments,
//   product related data---------------
      product_id: ret.order.product.id,
      product_name: ret.order.product.name,
      product_img: ret.order.product.image_url,
      product_quantity: ret.order.product.quantity,
      product_size: ret.order.product.selectedSize,
//   user related data------------------     
      user: ret.order.user.id,
      user_name: ret.order.user.username,
//   Order related data-----------------
      orderId: ret.order.id,
      order_status: ret.order.status,
      order_ordered_at: ret.order.ordered_at,
      order_delivery_date: ret.order.out_for_delivery_date,
      order_item_is_delivered: ret.order.item_is_delivered,
      order_order_confirmed_date: ret.order.order_confirmed_date,
      order_item_shipped_date: ret.order.item_shipped_date,
      order_returns: ret.order.returns,
      
    }));
  } catch (error) {
    console.error('Error fetching return data:', error);
    throw error;
  }
};

export const updateReturnByOrderId = async (orderId: number, returnReason: string, comments: string) => {
    const returnRepository = getRepository(Return);
  
    const returnEntry = await returnRepository.findOne({ where: { order: { id: orderId } } });
  
    if (!returnEntry) {
      throw new Error('Return entry not found');
    }
  
    returnEntry.return_reason = returnReason;
    returnEntry.comments = comments;
  
    await returnRepository.save(returnEntry);
  
    return returnEntry;
  };