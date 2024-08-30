import { getRepository } from 'typeorm';
import { Order } from '../models/orderModel';
import { User } from '../models/user';
import { Product } from '../models/product';
import { Carts } from '../models/cart';
import { Return } from '../models/order_return';
import { CustomerReview } from '../models/customerReview';
import { Address } from '../models/address';

export const createOrder = async (
  userId: number,
  productId: number,
  status: string,
  paymentMethod: string,
  addressId: number
) => {
  const orderRepository = getRepository(Order);
  const userRepository = getRepository(User);
  const productRepository = getRepository(Product);
  const addressRepository = getRepository(Address);

  // Parse IDs to ensure they are integers
  const parsedUserId = parseInt(userId.toString(), 10);
  const parsedProductId = parseInt(productId.toString(), 10);
  const parsedAddressId = parseInt(addressId.toString(), 10);

  if (isNaN(parsedUserId) || isNaN(parsedProductId) || isNaN(parsedAddressId)) {
    throw new Error('Invalid ID(s) provided');
  }

  const user = await userRepository.findOne({ where: { id: parsedUserId } });
  const product = await productRepository.findOne({ where: { id: parsedProductId } });
  const address = await addressRepository.findOne({ where: { id: parsedAddressId } });

  if (!user || !product || !address) {
    throw new Error('User, Product, or Address not found');
  }

  const newOrder = orderRepository.create({
    user,
    product,
    address,
    status,
    payment_method: paymentMethod
  });

  await orderRepository.save(newOrder);
  return {
    id: newOrder.id,
    user_id: user.id, // Include only user_id
    product: product,
    status: newOrder.status,
    payment_method: paymentMethod,
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

// ---------------------------------------------------------------------------------------------------

export const getFilteredOrders = async (userId: number) => {
  const orderRepository = getRepository(Order);
  const reviewRepository = getRepository(CustomerReview);
  const productRepository = getRepository(Product);

  // Fetch all orders with status "Delivered" or "Returned" for the user
  const orders = await orderRepository
    .createQueryBuilder('order')
    .leftJoinAndSelect('order.product', 'product')
    .where('order.user_id = :userId', { userId })
    .andWhere('order.status IN (:...statuses)', { statuses: ['Delivered', 'Returned'] })
    .getMany();

  // Get product IDs that have been reviewed by the user
  const reviewedProducts = await reviewRepository
    .createQueryBuilder('review')
    .select('review.product.id')
    .where('review.user.id = :userId', { userId })
    .getMany();

  const reviewedProductIds = reviewedProducts.map(review => review.product.id);

  // Filter out orders with products that have been reviewed by the user
  const filteredOrders = orders.filter(order => !reviewedProductIds.includes(order.product.id));

  // Format the response
  const response = filteredOrders.map(order => ({
    product_id: order.product.id,
    product_name: order.product.name,
    product_image_url: order.product.image_url,
    order_status : order.status
  }));

  return response;
};

export const getOrderDetails = async (orderId: number) => {
  const orderRepository = getRepository(Order);
  const userRepository = getRepository(User);
  const productRepository = getRepository(Product);
  const addressRepository = getRepository(Address);

 // Fetch the order details including user, product, and address relations
const order = await orderRepository.findOne({
  where: { id: orderId },
  relations: ['user', 'product', 'address'], // Include the related entities
});

if (!order) {
  throw new Error('Order not found');
}

// Now you can safely access order.user, order.product, and order.address
const user = order.user;
const product = order.product;
const address = order.address;

if (!user || !product || !address) {
  throw new Error('Order details are incomplete');
}


  return {
    orderId: order.id,
    orderDate: order.ordered_at,
    paymentMethod: order.payment_method,
    orderConfirmedDate: order.order_confirmed_date,
    itemShippedDate: order.item_shipped_date,
    outForDeliveryDate: order.out_for_delivery_date,
    itemIsDelivered: order.item_is_delivered,
    refundStatus : order.refundStatus,
    returnDate : order.returnedDate,
    cancelDate : order.cancelDate,
    productDetails: {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: product.quantity, // Using order quantity
      size: product.selectedSize,
      imageUrl: product.image_url,
    },
    userDetails: {
      name: user.username,
      email: user.email,
    },
    addressDetails: {
      id: address.id,
      addressType: address.addresstype,
      houseName: address.housename,
      town: address.town,
      country: address.country,
      emirate: address.emirate,
      landMark: address.landmark,
      name: address.name,
      phoneNumber: address.phoneNumber,
      street: address.streetName,
    },
    orderSummary: {
      subTotal: order.subTotal,
      totalSavings: order.totalSavings,
      couponDiscount: order.couponDiscount,
      taxes: order.taxes,
      totalAmount: order.totalAmount,
    },
    invoiceUrl: `https://online.flippingbook.com/view/629852606/`,
  };
};

