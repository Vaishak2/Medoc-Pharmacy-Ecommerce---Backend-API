import { Request, Response } from 'express';
import { getReturnsByOrderId, updateReturnByOrderId } from '../repositories/returnRepository';

export const getReturnsByOrderIdController = async (req: Request, res: Response) => {
    const { orderId } = req.params;

    try {
        const returns = await getReturnsByOrderId(Number(orderId));
        res.status(200).json(
            {
                message: "Success",
                data: {returns}
            });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching return data', error: (error as Error).message });
    }
};

export const updateReturn = async (req: Request, res: Response) => {
    const { order_id } = req.params;
    const { return_reason, comments } = req.body;
  
    try {
      const updatedReturn = await updateReturnByOrderId(Number(order_id), return_reason, comments);
      res.status(200).json({
        message: 'Return updated successfully',
        data: updatedReturn,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error updating return',
        error: (error as Error).message,
      });
    }
  };