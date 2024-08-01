// src/controllers/dealController.ts
import { Request, Response } from 'express';
import { createDeal, getAllDeals, getDealById } from '../repositories/dealRepository';
import { fetchDealsByUserId } from '../services/dealService';

export const addDeal = async (req: Request, res: Response) => {
  try {
    const newDeal = await createDeal(req.body);
    res.status(201).json(newDeal);
  } catch (error) {
    res.status(500).json({ message: 'Error adding deal', error: (error as Error).message });
  }
};

export const fetchDeals = async (_req: Request, res: Response) => {
  try {
    const products = await getAllDeals();
    res.status(200).json({
      message: 'Success',
      data : {
        productsList:[products]
      }

    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching deals', error: (error as Error).message });
  }
};

export const fetchDealById = async (req: Request, res: Response) => {
  try {
    const products = await getDealById(parseInt(req.params.id));
    if (!products) {
      return res.status(404).json({ message: 'Deal not found' });
    }
    res.status(200).json({
      message: 'Success',
      data : {
        productsList:[products]
      }

    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching deal', error: (error as Error).message });
  }
};

export const getDeals = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const products = await fetchDealsByUserId(Number(userId));
    res.status(200).json({
      message: 'Success',
      data: {
        productsList:products
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching deals', error });
  }
};