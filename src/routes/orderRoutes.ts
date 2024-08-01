import { Router } from 'express';
import { postOrder, getOrders, cancelOrder,} from '../controllers/orderController';
import {authMiddleware} from '../middlewares/authMiddleware';
import { getReturnsByOrderIdController, updateReturn } from '../controllers/returnController';

const router = Router();

router.post('/orders/buy_now', postOrder);
router.get('/orders/:userId', getOrders);
router.put('/orders/cancel/:id',cancelOrder);
router.get('/returns/order/:orderId', getReturnsByOrderIdController);
router.put('/returns/order/:order_id', updateReturn);
// router.get('/orders/returns', getReturnSection);
// router.get('/returns/order/:orderId', getReturnsByOrderIdController);

export default router;
