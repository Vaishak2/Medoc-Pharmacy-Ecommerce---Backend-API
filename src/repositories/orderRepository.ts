import { getRepository } from 'typeorm';
import { Order } from '../models/orderModel';
import { User } from '../models/user';
import { Product } from '../models/product';
import { Carts } from '../models/cart';
import { Return } from '../models/order_return';

export const createOrder = async (userId: number, productId: number, status: string, payment_method:string) => {
  const orderRepository = getRepository(Order);
  const userRepository = getRepository(User);
  const productRepository = getRepository(Product);

  const user = await userRepository.findOne({ where: { id: userId } });
  const product = await productRepository.findOne({ where: { id: productId } });

  if (!user || !product) {
    throw new Error('User or Product not found');
  }

  const newOrder = orderRepository.create({
    user,
    product,
    status,
    payment_method
  });

  await orderRepository.save(newOrder);
  return {
    id: newOrder.id,
    user_id: user.id, // Include only user_id
    product: product,
    status: newOrder.status,
    payment_method,
    orderedAt: newOrder.ordered_at,
  };
};
export const getOrdersByUserId = async (userId: number, status?: string, page: number = 1, pageSize: number = 10, searchQuery: string = '') => {
  try {
    const orderRepository = getRepository(Order);

    const query = orderRepository.createQueryBuilder('order')
      .leftJoinAndSelect('order.product', 'product')
      .leftJoinAndSelect('order.user', 'user')
      .where('order.user.id = :userId', { userId });

    if (searchQuery) {
      query.andWhere('product.name ILIKE :searchQuery', { searchQuery: `%${searchQuery}%` });
    }

    if (status) {
      query.andWhere('order.status = :status', { status });
    }

    query.skip((page - 1) * pageSize)
      .take(pageSize);

    const [orders, total] = await query.getManyAndCount();

    return { orders, total };
  } catch (error) {
    console.error('Error fetching orders by user ID:', error);
    throw new Error('Error fetching orders');
  }
};
// export const cancelOrderById = async (id: number) => {
//   const orderRepository = getRepository(Order);
//   const order = await orderRepository.findOne({ where: { id } });

//   if (!order) {
//     throw new Error('Order not found');
//   }

//   order.status = 'cancelled';
//   await orderRepository.save(order);
//   return order;
// };

export const cancelOrderById = async (id: number,reason: string ,comments: string) => {
  const orderRepository = getRepository(Order);

  // Use query builder to fetch the order with user and product relations
  const order = await orderRepository
    .createQueryBuilder('order')
    .leftJoinAndSelect('order.user', 'user')
    .leftJoinAndSelect('order.product', 'product')
    .where('order.id = :id', { id })
    .getOne();

  if (!order) {
    throw new Error('Order not found');
  }
  
  order.status = 'Cancelled';
  order.reason_for_cancel = reason
  order.comments = comments
  await orderRepository.save(order);
  return order;
};

// -------------------------------------------------------------------------------------------------

