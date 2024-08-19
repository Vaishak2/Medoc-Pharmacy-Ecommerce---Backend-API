import { Router } from 'express';
import { postOrder, getOrders, cancelOrder, getFilteredOrdersHandler, getOrderDetailsController,} from '../controllers/orderController';
import {authMiddleware} from '../middlewares/authMiddleware';
import {createReturnHandler, getReturnsByOrderIdController, updateReturnHandler,} from '../controllers/returnController';

const router = Router();

router.post('/orders/buy_now', postOrder);
router.get('/orders/:userId', getOrders);
router.put('/orders/cancel/:id',cancelOrder);

// Route for returns
router.get('/returns/order/:orderId', getReturnsByOrderIdController);
router.post('/returns', createReturnHandler);
router.put('/returns/:order_id', updateReturnHandler);
router.get('/orderDetails/:orderId', getOrderDetailsController);


router.get('/orders/delivered/:user_id', getFilteredOrdersHandler);

// router.get('/orders/returns', getReturnSection);
// router.get('/returns/order/:orderId', getReturnsByOrderIdController);

export default router;
