import { Request, Response } from 'express';
import { createOrder, getOrdersByUserId, cancelOrderById, getFilteredOrders, getOrderDetails,} from '../repositories/orderRepository';
import { createNotification } from '../repositories/notificationRepository';
import { Carts } from '../models/cart';

// export const postOrder = async (req: Request, res: Response) => {
//   const { userId, productId, status } = req.body;

//   try {
//     const newOrder = await createOrder(Number(userId), Number(productId), status);
//     res.status(201).json({
//       message: "Success",
//       data: newOrder
//     });


//   } catch (error) {
//     res.status(500).json({ message: 'Error creating order', error });
//   }
// };


export const postOrder = async (req: Request, res: Response) => {
  try {
    const { userId, productId, status, paymentMethod, addressId } = req.body;

    const newOrder = await createOrder(
      parseInt(userId, 10),
      parseInt(productId, 10),
      status,
      paymentMethod,  // pass this as 'paymentMethod' but in service, it's 'payment_method'
      parseInt(addressId, 10)
    );

    res.status(201).json({
      message: 'Order created successfully',
      data: newOrder,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error creating order',
      error: (error as Error).message,
    });
  }
};


export const getOrders = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { status, page = 1, pageSize = 10, searchQuery = '' } = req.query;

  try {
    const { orders, total } = await getOrdersByUserId(Number(userId), status as string, Number(page), Number(pageSize), searchQuery as string,);
    const ordersList = orders.map(order => ({
      id: order.id,
      user_id: order.user.id,
      product: {
        id: order.product.id,
        name: order.product.name,
        price: order.product.price,
        img: order.product.image_url,
        stock: order.product.stockQuantity,
        size: order.product.selectedSize,
        quantity: order.product.quantity
      },
    
      status: order.status,
      payment_method:order.payment_method,
      orderedAt: order.ordered_at,
    }));

    res.status(200).json({
      message: "Success",
      data: { orders: ordersList, total, page: Number(page), pageSize: Number(pageSize) }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error });
  }
};

export const cancelOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const {reason , comments } = req.body

  try {
    const cancelledOrder = await cancelOrderById(Number(id),reason ,comments);
    await createNotification(cancelledOrder.user.id, 'Order Cancelled', `Order ${cancelledOrder.product.name} has been cancelled successfully`);
    res.status(200).json({
      message: 'Order cancelled successfully',
      data: cancelledOrder
    });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling order', error });
  }
};

export const getFilteredOrdersHandler = async (req: Request, res: Response) => {
  const { user_id } = req.params;

  try {
    const orders = await getFilteredOrders(Number(user_id));
    res.status(200).json({
      message: 'Filtered orders retrieved successfully',
      data: {orders},
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving filtered orders',
      error: (error as Error).message,
    });
  }
};

export const getOrderDetailsController = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const orderDetails = await getOrderDetails(Number(orderId));
    res.json({
      message : "Success",
      data :  orderDetails
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order details', error: (error as Error).message });
  }
};





