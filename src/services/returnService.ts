// src/services/returnService.ts
// import { AppDataSource } from '../database/dataSource';
// import { Return } from '../models/order_return';

// export const getReturnsWithAllData = async (orderId: number) => {
//   const returnRepository = AppDataSource.getRepository(Return);

//   try {
//     const returns = await returnRepository.createQueryBuilder('returns')
//       .leftJoinAndSelect('returns.order', 'order')
//       .leftJoinAndSelect('order.product', 'product')
//       .leftJoinAndSelect('order.user', 'user')
//       .leftJoinAndSelect('order.cart', 'cart')
//       .select([
//         'returns',
//         'order',
//         'product',
//         'user',
//         'cart'
//       ])
//       .where('order.id = :orderId', { orderId })
//       .getMany();

//     return returns.map(ret => ({
//       return_data: ret,
//       order_data: ret.order,
//       product_data: ret.order.product,
//       user_data: ret.order.user,
//       cart_data: ret.order.cart
//     }));
//   } catch (error) {
//     console.error('Error fetching return data:', error);
//     throw error;
//   }
// };
