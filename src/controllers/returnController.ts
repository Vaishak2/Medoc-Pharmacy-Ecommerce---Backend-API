import { Request, Response } from 'express';
import { createReturn, getReturnsByOrderId, updateReturnByOrderId } from '../repositories/returnRepository';

export const getReturnsByOrderIdController = async (req: Request, res: Response) => {
  const { orderId } = req.params;

  try {
    const returns = await getReturnsByOrderId(Number(orderId));
    res.status(200).json(
      {
        message: "Success",
        data: { returns }
      });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching return data', error: (error as Error).message });
  }
};

export const createReturnHandler = async (req: Request, res: Response) => {
  const { order_id, return_date, return_request_date, return_amount, purchased_amount, return_reason, comments } = req.body;

  // if (!order_id || !return_date || !return_request_date || !return_amount || !purchased_amount || !return_reason) {
  //   return res.status(400).json({ message: 'Missing required fields' });
  // }
  // for Avoid duplicatiopn
  try {
    const newReturn = await createReturn(
      order_id,
      // new Date(return_date),
      // new Date(return_request_date),
      // return_amount,
      // purchased_amount,
      return_reason,
      comments
    );
    res.status(201).json({
      message: 'Return created successfully',
      data: newReturn,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error creating return',
      error: (error as Error).message,
    });
  }
};
export const updateReturnHandler = async (req: Request, res: Response) => {
  const { order_id } = req.params;
  const { return_reason, comments } = req.body;

  if (!return_reason || !comments) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

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



